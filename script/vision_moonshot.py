#!/usr/bin/env python3
"""Moonshot Kimi 视觉分析脚本"""

import os
import sys
import base64
from pathlib import Path

from openai import OpenAI


def analyze_image(image_path: str, prompt: str = "请描述图片的内容。") -> str:
    client = OpenAI(
        api_key=os.environ.get("MOONSHOT_API_KEY"),
        base_url="https://api.moonshot.cn/v1",
    )

    path = Path(image_path)
    suffix = path.suffix.lstrip(".")
    mime_map = {"png": "image/png", "jpg": "image/jpeg", "jpeg": "image/jpeg", "webp": "image/webp", "gif": "image/gif"}
    mime = mime_map.get(suffix, f"image/{suffix}")

    with open(image_path, "rb") as f:
        image_data = f.read()

    image_url = f"data:{mime};base64,{base64.b64encode(image_data).decode('utf-8')}"

    completion = client.chat.completions.create(
        model="kimi-k2.6",
        messages=[
            {"role": "system", "content": "你是 Kimi。"},
            {
                "role": "user",
                "content": [
                    {"type": "image_url", "image_url": {"url": image_url}},
                    {"type": "text", "text": prompt},
                ],
            },
        ],
    )
    return completion.choices[0].message.content


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python vision_moonshot.py <image_path> [prompt]")
        sys.exit(1)

    image_path = sys.argv[1]
    prompt = sys.argv[2] if len(sys.argv) > 2 else "请描述图片的内容。"

    if not os.path.exists(image_path):
        print(f"Error: {image_path} not found")
        sys.exit(1)

    result = analyze_image(image_path, prompt)
    print(result)
