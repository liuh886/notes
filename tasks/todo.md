# Task: 主页活跃系统精简与重排 (Homepage Operations Curation)

- [x] **Phase 1: 需求对齐与方案规划** <!-- id: 100 -->
  - [x] 分析当前 `_data/current_operations.yml` 与 `_data/selected_deployments.yml` 结构 <!-- id: 101 -->
  - [x] 与用户确认变更清单与各项字段设计（OP-01~OP-04、C-02、P-01~P-05） <!-- id: 102 -->

- [x] **Phase 2: 数据与页面内容调整** <!-- id: 103 -->
  - [x] 更新 `_data/current_operations.yml`：
    - 保留 `OP-01`: CCUS Policy Hub
    - 保留 `OP-02`: Ownly
    - 移除 `AlphaEngine` 和 `NewsFlow`
    - 新增 `OP-03`: Ductor — AI Agentic Harness
    - 新增 `OP-04`: Climate-to-energy downscaling <!-- id: 104 -->
  - [x] 更新 `_data/selected_deployments.yml`：
    - `code` 分组下：将原 `C-02`（Ductor）替换为下移的 `RhythmCoach`
    - `projects` 分组下：移除已提前到 OP-04 的 `Climate-to-energy downscaling`，重新顺延编号（Quad 35 $\to$ P-04，OffshoreOrient Studio $\to$ P-05） <!-- id: 105 -->
  - [x] 更新 `_pages/about.md`：调整当前活跃系统导语，使其精准匹配 4 个核心系统领域 <!-- id: 106 -->

- [x] **Phase 3: 契约文档与自动化测试同步** <!-- id: 107 -->
  - [x] 同步 `docs/DESIGN_SYSTEM.md` 与 `docs/HOMEPAGE_FRONTEND_GOVERNANCE.md`（系统数量 5 $\to$ 4） <!-- id: 108 -->
  - [x] 同步 `test/style_contract.js` 与 `test/home_content_contract.js` 断言 <!-- id: 109 -->
  - [x] 运行 Prettier 格式化并执行 `npm run lint:style-contract` 校验 <!-- id: 110 -->

- [/] **Phase 4: 提交、PR 与合并** <!-- id: 111 -->
  - [ ] 创建新分支，提交修改并推送远程 <!-- id: 112 -->
  - [ ] 创建 PR 并 Squash & Merge 到 `master` <!-- id: 113 -->
  - [ ] 更新本地 `master` 并记录任务总结 <!-- id: 114 -->

## Review
- **变更目标**：精简重组主页核心展示矩阵，突出 CCUS、本地优先工具、AI Agentic 体系及能源气象降尺度四大支柱。
- **改动成果**：
  1. `_data/current_operations.yml`：保留 OP-01 (CCUS Policy Hub) 与 OP-02 (Ownly)，下架 AlphaEngine 与 NewsFlow，提前提升 Ductor (OP-03) 与 Climate-to-energy downscaling (OP-04)；
  2. `_data/selected_deployments.yml`：将 RhythmCoach 移动至 C-02 代替 Ductor，移除已提前的降尺度项目并重排顺延 P-04、P-05 序号，遵守无重复条目治理规则；
  3. `_pages/about.md` 与规范文档：更新导语与数量说明（4 个核心系统）；
  4. 测试与代码风格：同步契约测试断言并通过 Prettier 格式化，`npm run lint:style-contract` 全部通过。
