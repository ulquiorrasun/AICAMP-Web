# Workshop TODO – 卡片累计浏览量 MVP（Supabase 版本）

| 序号 | 任务 | 预计耗时 |
|----|------|--------|
| 1 | 克隆/拉取代码 & `pnpm install`，确保环境可运行 | 10 min |
| 2 | 在 Supabase 控制台创建 Postgres 数据库，获取连接串 | 10 min |
| 3 | 写入 `.env.local` → `DATABASE_URL="postgresql://...supabase..."` | 5 min |
| 4 | 运行 `pnpm db:migrate` 并新增表 `tool_pv_total(tool_id, total_pv)` | 10 min |
| 5 | 在 `src/models/view.ts` 编写 `incrementToolPv(id)`（Drizzle `insert on conflict do update`) | 15 min |
| 6 | 新建 `POST /api/track-view` 调用 `incrementToolPv` | 10 min |
| 7 | 在 `ToolCard` 点击或页面加载时 `fetch('/api/track-view')`（非阻塞） | 10 min |
| 8 | 新建 `GET /api/tool-pv?ids=`：批量查询 `tool_pv_total` 返回数字 | 10 min |
| 9 | `ToolGrid` 批量请求 `/api/tool-pv`，将数字注入卡片 | 15 min |
| 10 | UI 美化：数字格式化 `1.2k`，Skeleton 占位，错误降级 | 10 min |
