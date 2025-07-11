# MVP Workshop TODO List (2–3 hr)

> 仅保留必需功能；每项任务 5–20 分钟；总计 ≈ 2.5 小时。

| # | 任务 | 预计耗时 |
|---|------|----------|
|1|确认现有项目启动：`pnpm dev` 能无报错运行|10 min|
|2|添加 `.env.example` 并在本地 `.env` 填入 AI_API_KEY|5 min|
|3|创建新页面 `/mcq`（或更新首页）作为生成界面|10 min|
|4|在页面中放置 **年级下拉**（K-12）— 复用 `select.tsx`|10 min|
|5|添加 **学科/主题输入框** — 复用 `input.tsx`，并做必填校验|10 min|
|6|放置 **Generate** 按钮 (`button.tsx`)；前端 fetch `/api/generate-mcq`|10 min|
|7|实现 API 路由 `/api/generate-mcq`：读取 grade+topic，校验参数|15 min|
|8|在路由中调用 OpenAI（参考 `gen-text/route.ts`）并组装提示词|15 min|
|9|解析模型输出成 `{question, choices, correctIndex, explanation}` JSON 并返回|10 min|
|10|前端渲染返回内容：问题、选项、正确答案与解释|10 min|
|11|添加加载 Skeleton & 错误 Alert 交互；清理 UX|10 min|
|12|快速移动端检查：使用 `useIsMobile()` 调整布局|10 min|

**完成标准**：输入年级与主题，点击 Generate，5-10 秒内在页面看到完整 MCQ 与解释；无控制台错误。
