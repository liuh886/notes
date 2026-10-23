# Task: 7项页面与数据打磨 (Announcements, CV Skills, Publications, Operations Order, Typo & Identity)

- [x] **Phase 1: 逐项实施内容修改** <!-- id: 400 -->
  - [x] 1. 修复 `_posts/2023-02-08-SDG2023.md` 错字 (`scerets` $\to$ `secrets`) <!-- id: 401 -->
  - [x] 2. 更新 `_news/` 下全部 7 篇公告标题（精准匹配指定命名） <!-- id: 402 -->
  - [x] 3. 补充 `_data/cv.yml` 中的 Skills（Programming + TypeScript / JavaScript；Data & Engineering + LLM agent harnesses & tooling） <!-- id: 403 -->
  - [x] 4. 新增 Caixin ESG30 Young Scholars 至 `_bibliography/papers.bib` 与 `_data/cv.yml` <!-- id: 404 -->
  - [x] 5. 调整 `_data/current_operations.yml` 顺序：CCUS $\to$ Ductor $\to$ Downscaling $\to$ Ownly <!-- id: 405 -->
  - [x] 6. 统一首页定位文案（`_pages/about.md` eyebrow）与关于页明确（`title: about`，添加 `/about/` 重定向） <!-- id: 406 -->

- [x] **Phase 2: 测试断言同步与本地质检** <!-- id: 407 -->
  - [x] 更新 `test/home_content_contract.js` 与 `test/style_contract.js` 对应断言 <!-- id: 408 -->
  - [x] 运行 `npx prettier --write` 格式化测试文件 <!-- id: 409 -->
  - [x] 执行 `npm run lint:style-contract` 确保全绿 <!-- id: 410 -->

- [/] **Phase 3: 提交、PR 与合并** <!-- id: 411 -->
  - [ ] 创建分支并推送至 `origin` <!-- id: 412 -->
  - [ ] 创建 PR 并 Squash & Merge 到 `master` <!-- id: 413 -->
  - [ ] 检查 GitHub Actions 部署流水线并反馈结果 <!-- id: 414 -->

## Review
- **错字修复**：SDG 2023 文章 description 中的 `scerets` 已修正为 `secrets`；
- **公告规范化**：`_news/` 全部 7 篇公告增加语义化 `title`，彻底解决回退显示 `Announcement_202602` 等文件名的问题；
- **CV 技能升级**：补充了 TypeScript / JavaScript 以及 LLM agent harnesses & tooling；
- **Publications 更新**：在 `papers.bib` 与 `cv.yml` 中正式收录 2026 年 Caixin ESG30 Young Scholars 荣誉与研究方向；
- **活跃系统排序**：`_data/current_operations.yml` 顺序调整为 CCUS (OP-01) $\to$ Ductor (OP-02) $\to$ Downscaling (OP-03) $\to$ Ownly (OP-04)；
- **身份定位与关于页契约**：首页 Eyebrow 统一为 `Climate & Energy Data Scientist · Caixin ESG30 Young Scholar`；`_pages/about.md` 明确声明 `title: about`，并配置 `/about/` 301 规范重定向；
- **质量保证**：全部测试契约通过，Prettier 格式化无误。
