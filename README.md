# 作業手順
privateモードでリポジトリを作っていく

win/macでのクロスブラウザチェックが終わったら公開設定

mobile (スマホ)の実機確認も可能ならば終わらせておく

参考：[localhostを使ってスマホで確認する方法](https://qiita.com/mako5656/items/411be80fff4600f241c3)

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
mobile (スマホ実機)の動作確認ができなかった場合ここで確認

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


<link rel="stylesheet" href="readme.css">