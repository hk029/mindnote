#!/usr/bin/env python3
"""
图片视觉理解工具
1. 上传图片到七牛 CDN
2. 调用小米 MiMo 模型进行视觉理解

用法：
  python scripts/vision.py <image_path_or_url> [--prompt "描述内容"]
"""

import os
import sys
import json
import argparse
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv(Path(__file__).resolve().parent.parent / '.env')

# ── 七牛配置 ──
QINIU_ACCESS_KEY = os.environ.get('QINIU_ACCESS_KEY')
QINIU_SECRET_KEY = os.environ.get('QINIU_SECRET_KEY')
QINIU_BUCKET = os.environ.get('QINIU_BUCKET')
QINIU_DOMAIN = os.environ.get('QINIU_DOMAIN', 'https://img.hksite.cn')
QINIU_REGION = os.environ.get('QINIU_REGION', 'z0')

# ── MiMo 配置 ──
MIMO_API_KEY = os.environ.get('MIMO_API_KEY')
MIMO_BASE_URL = os.environ.get('MIMO_BASE_URL', 'https://token-plan-cn.xiaomimimo.com/v1')
MIMO_MODEL = 'mimo-v2.5'


def upload_to_qiniu(local_path: str) -> str:
    """上传本地图片到七牛，返回 CDN URL"""
    import qiniu
    from qiniu import Auth, put_file_v2

    if not all([QINIU_ACCESS_KEY, QINIU_SECRET_KEY, QINIU_BUCKET]):
        print('❌ 缺少七牛环境变量 (QINIU_ACCESS_KEY / QINIU_SECRET_KEY / QINIU_BUCKET)')
        sys.exit(1)

    filename = Path(local_path).name
    key = f'rocokingdom/vision/{filename}'

    auth = Auth(QINIU_ACCESS_KEY, QINIU_SECRET_KEY)
    token = auth.upload_token(QINIU_BUCKET, key)

    ret, info = put_file_v2(token, key, local_path, mime_type='image/png')
    if info.status_code != 200:
        print(f'❌ 上传失败: {info}')
        sys.exit(1)

    url = f'{QINIU_DOMAIN}/{key}'
    print(f'✅ 已上传: {url}')
    return url


def analyze_image(image_url: str, prompt: str = '请描述这张图片的内容') -> str:
    """调用 MiMo 模型分析图片"""
    if not MIMO_API_KEY:
        print('❌ 缺少 MIMO_API_KEY 环境变量')
        sys.exit(1)

    client = OpenAI(api_key=MIMO_API_KEY, base_url=MIMO_BASE_URL)

    completion = client.chat.completions.create(
        model=MIMO_MODEL,
        messages=[
            {
                'role': 'system',
                'content': 'You are MiMo, an AI assistant developed by Xiaomi.'
            },
            {
                'role': 'user',
                'content': [
                    {
                        'type': 'image_url',
                        'image_url': {'url': image_url}
                    },
                    {
                        'type': 'text',
                        'text': prompt
                    }
                ]
            }
        ],
        max_completion_tokens=2048
    )

    return completion.choices[0].message.content


def main():
    parser = argparse.ArgumentParser(description='图片视觉理解工具')
    parser.add_argument('image', help='图片本地路径或 URL')
    parser.add_argument('--prompt', '-p', default='请详细描述这张图片的内容，包括文字、布局、颜色和具体元素',
                        help='视觉理解提示词')
    parser.add_argument('--no-upload', action='store_true', help='跳过上传，直接使用 URL（仅当 image 为 URL 时有效）')
    args = parser.parse_args()

    # 判断是 URL 还是本地文件
    if args.image.startswith('http://') or args.image.startswith('https://'):
        if args.no_upload:
            image_url = args.image
            print(f'🔗 直接使用 URL: {image_url}')
        else:
            print('⚠️ 输入是 URL，如需直接使用请加 --no-upload')
            sys.exit(1)
    else:
        local_path = Path(args.image).resolve()
        if not local_path.exists():
            print(f'❌ 文件不存在: {local_path}')
            sys.exit(1)
        image_url = upload_to_qiniu(str(local_path))

    print(f'\n  MiMo 视觉理解中...')
    result = analyze_image(image_url, args.prompt)
    print(f'\n📝 结果:\n{result}')


if __name__ == '__main__':
    main()
