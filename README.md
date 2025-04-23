## 開発の手順
1. `npm install`
2. .envの内容を埋める
3. `npm run dev`

## ローカルDB環境での開発(マイグレーション手順)
ログインしていない場合:`supabase login`
1. Docker Desktopを起動しておく
1. `supabase link`で**name:SFE**を選択(passwordは知っている人に聞きましょう)
2. `supabase db diff --linked > supabase\migrations\20250422114153_create_copy.sql`。
3. (レコード削除する場合:`supabase db reset`)→`supabase start`し、Studioに移動。

## ローカル環境での開発(マイグレーション後)
1. Docker Desktopを起動しておく
2. `supabase start`
3. .envの内容を合わせる
4. 開発を終了する際に`supabase stop --backup`
