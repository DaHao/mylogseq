- Hexo 是一個可以用 Github 來架網站的軟體
- # 可以調整的地方
  * sakura theme
  	根據這個 theme 去改，我喜歡那個貓垂吊下來的特效
  	https://docs.hojun.cn/sakura/docs/#/home
  	https://github.com/honjun/hexo-theme-sakura
  * 可以讓你在 blog 上面的文章輸入密碼後才能看
   https://github.com/D0n9X1n/hexo-blog-encrypt/blob/master/ReadMe.zh.md
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
- # 文章可以給的參數
  ```
  ---
  title: Axios 替換 Request 上傳檔案
  tags:
    - Troubleshooting
  index_img: 'https://cdn.pixabay.com/photo/2016/12/30/17/27/cat-1941089_1280.jpg'
  banner_img: 'https://cdn.pixabay.com/photo/2016/12/30/17/27/cat-1941089_1280.jpg'
  date: 2022-02-06 15:18:30
  ---
  ```
-
- # 自訂網域設定教學
  https://www.larrynote.com/website-service/30/
  雖然後面的步驟好像沒有作用，我到 google dns 作完設定後好像就連得到了……？
-
- # 參考連結
  * https://medium.com/@bebebobohaha/%E4%BD%BF%E7%94%A8-hexo-gitpage-%E6%90%AD%E5%BB%BA%E5%80%8B%E4%BA%BA-blog-5c6ed52f23db
  
  * https://medium.com/@moojing/%E5%80%8B%E4%BA%BA%E6%8A%80%E8%A1%93%E7%AB%99%E4%B8%80%E6%8A%8A%E7%BD%A9-%E9%83%A8%E8%90%BD%E6%A0%BC%E5%BB%BA%E7%BD%AE%E5%A4%A7%E5%85%A8-%E4%B8%80-%E4%BD%BF%E7%94%A8-hexo-%E6%90%AD%E9%85%8D-github-page-%E5%BB%BA%E7%BD%AE%E8%87%AA%E5%B7%B1%E7%9A%84%E9%83%A8%E8%90%BD%E6%A0%BC-4fe5d02dbbf8
  
  * https://www.larrynote.com/website-service/31/