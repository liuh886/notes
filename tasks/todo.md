# Task: CV 2014-2020 Field Engineer 履历补充与优化

- [x] **Phase 1: 问题诊断与历史事实核查** <!-- id: 0 -->
  - [x] 核查 `cv.md`、`_data/cv.yml` 现状，确认 2014-2020 年经验缺失原因 <!-- id: 1 -->
  - [x] 从 Git 历史、`CV_Zhihao_geoscience.pdf`、`2019_offshoreorient.md`、`_news` 等归档中挖掘 2014-2020 年 Field Engineer 真实经历与亮点 <!-- id: 2 -->
  - [x] 制定补全方案并与用户确认（岗位名称、起止时间、核心成就与技术关键词） <!-- id: 3 -->

- [x] **Phase 2: 更新与完善 CV 数据** <!-- id: 4 -->
  - [x] 在 `_data/cv.yml` 的 `Experience` 部分补充精炼版 2014.07 - 2021.07 Field Engineer 经历 <!-- id: 5 -->
  - [x] 校验 Rendercv / Jekyll 对新增履历的结构解析与排版兼容性 <!-- id: 6 -->

- [x] **Phase 3: 自动化校验与质检** <!-- id: 7 -->
  - [x] 运行 `npm run lint:style-contract` 确保未破坏现有样式与页面契约 <!-- id: 8 -->
  - [x] 检查并确认 `/cv/` 页面数据契约与时间线完整性 <!-- id: 9 -->
  - [x] 更新 `tasks/todo.md` 的 Review 总结 <!-- id: 10 -->

- [x] **Phase 4: 精简首页活跃产品并合并** <!-- id: 11 -->
  - [x] 格式化测试文件，确保 `npx prettier --check` 与 `npm run lint:style-contract` 通过 <!-- id: 12 -->
  - [ ] 提交分支并创建 PR 合并入 `master` <!-- id: 13 -->

## Review
- **问题根因**：原 `_data/cv.yml` 在过去向 Rendercv 格式规范化时，将原本存放于 `Additional Experience` 的 2014-2021 年 BGP Offshore 经历遗漏，导致 2014 年本科毕业至 2021 年攻读硕士期间产生 7 年空白。
- **改动成果**：在 `_data/cv.yml` 的 `Experience` 模块中补充了 `BGP Offshore, CNPC` 的 `Field Engineer & Assistant Project Manager`（2014-07 至 2021-07）记录。精炼为 3 条高价值 highlights，与上下其他经历保持完全一致的排版体量与 Rendercv 数据格式。
- **校验与发布**：创建分支 `content/cv-field-engineer-experience`，提交 Pull Request [#131](https://github.com/liuh886/notes/pull/131)，通过管理权限 Squash & Merge 顺利合并入 `master`，远程分支已同步清理，本地工作区及 `master` 已同步至最新 commit `1724d744`。全部样式契约测试均通过。
