#!/usr/bin/env python3
"""Reject source metadata that can generate ambiguous Jekyll destinations."""

from __future__ import annotations

import re
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE_SUFFIXES = {".md", ".markdown", ".html"}
EXCLUDED_PARTS = {".git", "_site", "node_modules", "vendor"}
PERMALINK_RE = re.compile(r"^permalink:\s*[\"']?(.+?)[\"']?\s*$")
KEY_RE = re.compile(r"^([A-Za-z0-9_-]+):(?:\s*(.*))?$")
LIST_ITEM_RE = re.compile(r"^\s+-\s+(.+?)\s*$")


def front_matter(path: Path) -> list[str]:
    text = path.read_text(encoding="utf-8")
    lines = text.splitlines()
    if not lines or lines[0].strip() != "---":
        return []
    for index, line in enumerate(lines[1:], start=1):
        if line.strip() == "---":
            return lines[1:index]
    raise ValueError(f"unterminated front matter: {path.relative_to(ROOT)}")


def clean_scalar(value: str) -> str:
    value = value.strip().strip("\"'")
    return value


def split_inline_list(value: str) -> list[str]:
    value = value.strip()
    if not value:
        return []
    if value.startswith("[") and value.endswith("]"):
        value = value[1:-1]
        parts = value.split(",")
    else:
        parts = value.split()
    return [clean_scalar(part) for part in parts if clean_scalar(part)]


def metadata(path: Path) -> tuple[str | None, list[str]]:
    lines = front_matter(path)
    permalink: str | None = None
    tags: list[str] = []
    active_list: str | None = None

    for line in lines:
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        item = LIST_ITEM_RE.match(line)
        if item and active_list == "tags":
            tags.append(clean_scalar(item.group(1)))
            continue
        if line.startswith((" ", "\t")):
            continue

        active_list = None
        permalink_match = PERMALINK_RE.match(line)
        if permalink_match:
            permalink = clean_scalar(permalink_match.group(1))
            continue

        key_match = KEY_RE.match(line)
        if not key_match:
            continue
        key, raw_value = key_match.groups()
        if key == "tags":
            if raw_value:
                tags.extend(split_inline_list(raw_value))
            else:
                active_list = "tags"

    return permalink, tags


def source_files() -> list[Path]:
    return sorted(
        path
        for path in ROOT.rglob("*")
        if path.is_file()
        and path.suffix.lower() in SOURCE_SUFFIXES
        and not EXCLUDED_PARTS.intersection(path.relative_to(ROOT).parts)
    )


def main() -> int:
    permalink_sources: dict[str, list[str]] = defaultdict(list)
    tag_variants: dict[str, dict[str, set[str]]] = defaultdict(lambda: defaultdict(set))
    duplicate_tags: list[str] = []

    for path in source_files():
        relative = path.relative_to(ROOT).as_posix()
        permalink, tags = metadata(path)
        if permalink:
            permalink_sources[permalink].append(relative)

        seen_in_file: set[str] = set()
        for tag in tags:
            normalized = tag.casefold()
            tag_variants[normalized][tag].add(relative)
            if normalized in seen_in_file:
                duplicate_tags.append(f"{relative}: duplicate tag {tag!r}")
            seen_in_file.add(normalized)

    violations: list[str] = []
    for permalink, paths in sorted(permalink_sources.items()):
        if len(paths) > 1:
            violations.append(f"duplicate permalink {permalink!r}: {', '.join(paths)}")

    for normalized, variants in sorted(tag_variants.items()):
        if len(variants) > 1:
            details = "; ".join(
                f"{variant!r} in {', '.join(sorted(paths))}"
                for variant, paths in sorted(variants.items())
            )
            violations.append(f"case-colliding tag {normalized!r}: {details}")

    violations.extend(sorted(duplicate_tags))
    if violations:
        for violation in violations:
            print(f"SITE SOURCE VIOLATION: {violation}")
        return 1

    print(
        f"Site source contract passed: {len(permalink_sources)} explicit permalinks, "
        f"{len(tag_variants)} normalized tags."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
