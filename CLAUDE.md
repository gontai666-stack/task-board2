# CLAUDE.md

このファイルは、このリポジトリでコードを扱う際に Claude Code (claude.ai/code) が従うべきガイダンスです。

## プロジェクト概要

task-board2 プロジェクト。テキスト入力でタスクを追加し、チェックボックスで完了・未完了を切り替え、削除もできるシンプルなタスクボードアプリ。タスクは `localStorage` に保存され、ページをリロードしても消えない。

## デプロイ先

https://gontai666-stack.github.io/task-board2/

- `main` ブランチへの push をトリガーに GitHub Actions ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)) がビルド・デプロイを実行する。
- Vite の `base` は [vite.config.ts](vite.config.ts) でリポジトリ名 `/task-board2/` に合わせて設定している。リポジトリ名を変更する場合はこの2箇所を揃えて更新すること。

## 技術スタック

- ビルドツール: Vite
- フレームワーク: React 19
- 言語: TypeScript
- Lint: oxlint (`npm run lint`)
- 状態管理: React の `useState` / `useEffect` のみ(外部の状態管理ライブラリは使用しない)
- データ永続化: ブラウザの `localStorage`
- デプロイ: GitHub Actions → GitHub Pages

主なコマンド:

- `npm run dev` — 開発サーバー起動
- `npm run build` — 型チェック(`tsc -b`)+ 本番ビルド
- `npm run lint` — oxlint によるチェック

## コンポーネントの命名規約

- コンポーネントは PascalCase で命名し、ファイル名もコンポーネント名と一致させる(例: [TaskItem.tsx](src/TaskItem.tsx))。1ファイル1コンポーネントとし、`export default` で公開する。
- Props の型は `<コンポーネント名>Props` という命名の `interface` として、コンポーネントと同じファイル内に定義する(例: `TaskItemProps`)。
- 複数コンポーネントで共有する型([Task](src/types.ts) など)は [src/types.ts](src/types.ts) にまとめる。コンポーネント固有の Props 型はここに置かない。
- スタイルは CSS クラスで行い、クラス名は kebab-case とする(例: `task-item`, `task-form`, `delete-button`)。状態を表すクラス(例: `completed`)は該当要素のベースクラスに追加する形で組み合わせる。
- CSS ファイルはコンポーネント単位ではなく、アプリ全体のスタイルを [App.css](src/App.css) にまとめる(現状の規模では per-component CSS は導入しない)。

## Git 運用ルール

- **コードを変更するたびに、変更内容をコミットし GitHub にプッシュすること。** 作業を溜め込まず、意味のある変更のまとまりごとに commit → push を行う。
- コミットメッセージは変更内容が分かるように簡潔に書く(「何を」ではなく「なぜ」を意識する)。
- push 前に `git status` / `git diff` で差分を確認し、意図しないファイル(認証情報や不要な生成物など)が含まれていないかチェックする。
- force push (`--force`) や履歴を書き換える操作は行わない。必要な場合は必ず事前にユーザーに確認する。
- push 先のリモートやブランチが未設定の場合は、作業を進める前にユーザーに確認する。
