import './LogPage.css'
import React, {useEffect, useRef, useChat} from 'react'

function LogPage(prop){

    const TopBanner = () => {
        return(
            <div className = "LogPage-topbanner">
                <span id = "b1"></span>
                <span id = "b2">歡迎回來</span>
                <span id = "b3" onClick={() => prop.setLoginLogup(0)}>×</span>
            </div>
        )
    }
    const MiddleContent = () => {
        return(
            <div>
                <div className = "LogPage-normal-login">
                    <div className="a2">
                        <div className="a1">
                            <input id="account" name="account" type="text" placeholder="請輸入您的帳號"/>
                        </div>
                        <div className="a1">
                            <input id="password" name="account" type="text" placeholder="請輸入您的密碼"/>
                        </div>
                    </div>
                    <div className="a1">
                        <button>登入</button>
                    </div>
                </div>
                <div className = "LogPage-email-login">
                    
                </div>
            </div>
        )
    }
    const Footer = () => {
        return(
            <div className = "LogPage-footer">
                <span>
                    您是新用戶嗎？
                </span>
                <button>註冊</button>
            </div>
        )
    }

    return(
        <div className = {prop.LogPageStyle}>
            <div className = "LogInterface">
                <TopBanner />
                <MiddleContent />
                <Footer />
            </div>
		</div>
    )
}

export default LogPage;
