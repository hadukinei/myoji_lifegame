# 作業手順
privateモードでリポジトリを作成

多人数チームでの作成も可能で、適宜フェッチ・コミット・プッシュ・プル等を行う

---
mobile (スマホ実機) の実機確認も可能ならば終わらせておく

参考：[localhostを使ってスマホで確認する方法](https://qiita.com/mako5656/items/411be80fff4600f241c3)

---
win/macでのクロスブラウザチェックが終わったら公開設定へ移る

```
- GA/GTAGの設定は後回し
- URLは確定しているのだが、そのURLが未だprivate状態で公開されていないので登録ができない
```
- `URL`: https://**GitHubアカウント名**.github.io/**リポジトリ名**/


# パブリックに変更
github.comのリポジトリページへ移動

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
- 要はprivateからpublishにするために、
- 「本当にやってもいいんですね？！」
- と力強く念押しをしてくれているのでクリックする回数が~~無駄に~~多くなっている
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
- 公開するブランチをmaster以外にする場合は適宜変更
- 例えば公開後に大規模な更新が発生し、それをチームで処理する場合
- 一度作業用のブランチを切って、そちらでGitの更新を掛ける分にはオートデプロイ処理は行われない
- フィックスしたらマスターブランチへマージすればよい
```

## 2b. 注釈
```
- リポジトリのトップフォルダを希望するならそのまま
- そこのindex.htmlがDirectoryIndexになる
```

---
# 確認
公開処理は完了
```
- ページURLはSettingsのPagesを読み込み直すとURLが表示されている
```

- Settings
- Pages
- Build and deployment
- `Check`: Source is **Deploy and a branch**

初期段階ではブランチの更新によりページが更新される
```
- GitHub Actionsを使う設定にも切り替えられるが理解が追いついてないので省略
- おそらく設定切替した後に出てくる、Jekyllの初期設定のままで使えると思うが怖いので触れない
- よほど特殊な使い方をしない限り、普通にマスターブランチの更新を使えばいいと思う
```

---
Gitをコミットしてプッシュすると、デプロイが自動的に始まる
- Actions
- All workflows
- `Check`: All workflows

ここにデプロイの進行具合のステータスが表示されるので、完了したら確認に行く

---
mobile (スマホ実機) の動作確認ができなかった場合

公開設定が終わって誰でも見れる状態になったので閲覧可能


# GA/GTAGの処理
サイトのURLが確定しないとテストできないので

導入については良き感じに


<link rel="stylesheet" href="readme.css">