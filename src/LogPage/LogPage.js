import './LogPage.css'
import React, {useEffect, useRef, useChat} from 'react'

function LogPage(prop){
    const logPageStyle = (prop.loginLogup === 0) ? "LogPage disable" : "LogPage"
    const TopBanner = () => {
        return(
            <div className = "LogPage-topbanner">
                <span id = "b1"></span>
                <span id = "b2">{(prop.loginLogup === 2) ? "建立您的帳戶" : "歡迎回來"}</span>
                <span id = "b3" onClick={() => prop.setLoginLogup(0)}>×</span>
            </div>
        )
    }
    const MiddleContent = () => {
        return(
            (prop.loginLogup === 2) ?
            <div>
                <div className = "LogPage-normal-login">
                    <div className="a4">
                        <div className="a3">
                            <div className="a2">
                                <div className="a1">
                                    <input id="first-name" name="account" type="text" placeholder="名字"/>
                                </div>
                                <div className="a1">
                                    <input id="last-name" name="account" type="text" placeholder="姓氏"/>
                                </div>
                            </div>
                            <div className="a1">
                                <input id="account" name="account" type="text" placeholder="帳號"/>
                            </div>
                            <div className="a1">
                                <input id="password" name="account" type="text" placeholder="密碼"/>
                            </div>
                        </div>
                        <div className="a1">
                            <button>立即註冊</button>
                        </div>
                    </div>
                </div>
                <div className = "LogPage-email-login">
                    
                </div>
            </div>
            :
            <div>
                <div className = "LogPage-normal-login">
                    <div className="a4">
                        <div className="a3">
                            <div className="a1">
                                <input id="account" name="account" type="text" placeholder="帳號"/>
                            </div>
                            <div className="a1">
                                <input id="password" name="account" type="text" placeholder="密碼"/>
                            </div>
                        </div>
                        <div className="a1">
                            <button>立即登入</button>
                        </div>
                    </div>
                </div>
                <div className = "LogPage-email-login">
                    
                </div>
            </div>
        )
    }
    const Footer = () => {
        return(
            (prop.loginLogup === 2) ? 
            <div className = "LogPage-footer">
                <span>
                    已有帳戶了嗎？
                </span>
                <button onClick={() => prop.setLoginLogup(1)}>立即登入</button>
            </div>
            :
            <div className = "LogPage-footer">
                <span>
                    您是新用戶嗎？
                </span>
                <button onClick={() => prop.setLoginLogup(2)}>立即建立帳戶</button>
            </div>
        )
    }

    return(
        <div className = {logPageStyle}>
            <div className = "LogInterface">
                <TopBanner />
                <MiddleContent />
                <Footer />
            </div>
		</div>
    )
}

export default LogPage;
