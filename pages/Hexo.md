- Hexo 是一個可以用 Github 來架網站的軟體
- # 可以調整的地方
  * sakura theme
  	根據這個 theme 去改，我喜歡那個貓垂吊下來的特效
  	https://docs.hojun.cn/sakura/docs/#/home
  	https://github.com/honjun/hexo-theme-sakura
  * 可以讓你在 blog 上面的文章輸入密碼後才能看
   https://github.com/D0n9X1n/hexo-blog-encrypt/blob/master/ReadMe.zh.md
-
- # Command
  ```bash
  # Download from Github
  $ git clone https://github.com/DaHao/myhexo.git
  
  # run at local
  $ hexo s
  $ hexo s --draft // 有草稿的時候
  
  # deploy
  $ hexo clean & hexo deploy
  
  # post
  # 寫草稿
  $ hexo new draft "Title"
  
  # 發佈草稿
  $ hexo publish "Title"
  ```