# [109-1] Web Programming Final -- PaPaGo
組別： Group 25  
作品： PaPaGo (A platform for sharing your travel stories)  
Deployed 連結： https://papagoisme.herokuapp.com/  
Demo影片連結： https://youtu.be/oxeRuyBGx0g

## 這個服務在做什麼
我們打算把旅遊相關的文章作出統整，規劃出一個類似Medium但具有主題性的部落格網站，使用者可以在註冊完帳號後，在我們的編輯器編輯出文章並發送，也能透過搜尋去找到想去地點的相關文章。
> - #### 使用方式
> 1. 使用者端：可以編輯、發送文章，並瀏覽相關文章和給予like。（yarn server, yarn start）
> 2. 伺服器端：儲存已發佈文章、草稿，以及搜尋功能。

## 使用與參考之框架/模組/原始碼
- #### frontend
> 1. react.js
> 2. antd
> 3. draft.js
> 4. axios
> 5. material-UI
> 6. react-icons
- #### backend
>  1. mongoose
>  2. graphql
>  3. websocket

## 專題心得
期末project讓我將整學期學到的前端、後端、資料庫的東西都發揮出來，也從實作project中了解到要架設一個全端網站有多麼不容易。最後要截止的這幾天都睡得很少，花很多時間在實作功能、debug，但在過程中，學到很多新的知識與技能，而且用自己的雙手實現一項project是一件令人相當有成就感的事。

## 組員貢獻
- 何承叡：使用draft.js及相關套件實作文章編輯頁面、文章與後端的傳送接收、登入註冊頁面、topbanner以及logo、首頁

- 李崇嘉：後端mongoose資料mutation、query及其schema（文章、圖片、like、使用者資訊）、架構graphql server以及schema、搜尋引擎、撰寫deploy相關的內容並發布於heroku（最後可以成功build以及執行server.js但現行有些問題還無法deploy上去heroku）

- 賴永玄：負責前端網頁的部分，about頁面、footer頁面、首頁、文章呈現方式、個人頁面以及文章列舉的頁面