# 作業手順
privateモードでリポジトリを作っていく

win/mac/mobileでのクロスブラウザチェックが終わったら公開設定

GA/GTAGの設定は後回しで


---
# パブリックに変更
github.comのリポジトリへ移動

- Settings
- General
- Danger Zone (下の方)
- Change repository visibility
- `Click`: Change visibility
- `Select`: Change to public
- `Click`: I want to make this repository public [*&#x2020; 1a*](#1a-注釈)
- `Click`: I have read and understand these effects [*&#x2020; 1a*](#1a-注釈)
- `Click`: Make this repository public [*&#x2020; 1a*](#1a-注釈)


## 1a. 注釈
```
  要はprivateからpublishにするために、
  「本当にやってもいいんですね？！」
  と力強く念押しをしてくれているのでクリックする回数が~~無駄に~~多くなっている
```

---
# 公開設定
そのままgithub.comで設定処理

- Settings
- Pages
- Build and deployment
- Branch
- `Select`: from **None** to **master** [*&#x2020; 2a*](#2a-注釈)
- `Change`: from **/(root)** to **DocumentRootにしたいフォルダ** [*&#x2020; 2b*](#2b-注釈)
- `Click`: Save


## 2a. 注釈
```
  公開するブランチをmaster以外にする場合は適宜変更
```

## 2b. 注釈
```
  リポジトリのトップフォルダを希望するならそのまま
  そこのindex.htmlがDirectiveIndexになる
```

---
# 確認
公開処理は完了
> ページURLはSettingsのPagesを読み込み直すとURLが表示されている

- Settings
- Pages
- Build and deployment
- `Check`: Source is **Deploy and a branch**

初期段階ではブランチの更新によりページが更新される
> GitHub Actionsを使う設定にも切り替えられるが、その場合は適宜ご自由に（説明が長くなるので）

---
Gitをコミットしてプッシュすると、デプロイが自動的に始まる
- Actions
- All workflows
- `Check`: All workflows

ここにデプロイの進行具合のステータスが表示されるので、完了したら確認に行く


---
# GA/GTAGの処理
サイトのURLが確定しないとテストできないので

導入については良き感じに


<style>h1{padding: 0.75rem 0 0.85rem; border: 0; background-color: #09090b; color: #f4f4f5; font-size: 1.5rem; line-height: 1;} h1:not(:first-of-type){margin-top: 3rem;} h2{width: fit-content; margin-bottom: 0.75rem; padding: 0 0.5rem; border-radius: 0.5rem; background-color: #0369a1; color: #e0f2fe; font-size: 1.5rem;} code{color: #10b981; font-weight: 700;} strong{color: #f59e0b;} s{color: #6b7280;} em{display: inline-block; padding: 0 0.25rem; border-radius: 0.25rem; background-color: #be123c; color: #ffe4e6; font-style: normal;}</style>