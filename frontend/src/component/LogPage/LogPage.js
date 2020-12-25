import './LogPage.css'
import React, {useEffect, useRef, useChat} from 'react'
import { useState } from 'react/cjs/react.development'

function LogPage(prop){
    const [errorType, setErrorType] = useState(0); //0: no error | 1: account or password incorrect | 2:incomplete form | 3:password reconfirm failed | 4:the account already exists
    const errorMessage = (errorType === 4) ? "*此帳號已存在*" :
                         (errorType === 3) ? "*兩次輸入的密碼不相符*" :
                         (errorType === 2) ? "*有空格未完成*" :
                         (errorType === 1) ? "*帳號或密碼輸入錯誤*":
                         ""
    const logInterfaceSize = {
        height: (prop.loginLogup === 2) ? "65vh" : "50vh",
        width: (prop.loginLogup === 2) ? "40%" : "40%",
    }
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
    const handleLoginLogup = () => {
        prop.setLoginState(true)
        prop.setLoginLogup(0)
    }
    const MiddleContent = () => {
        return(
            (prop.loginLogup === 2) ?
            <div className="LogPage-log-part">
                <div className = "LogPage-normal-logup">
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
                                <input id="password" name="account" type="password" placeholder="密碼"/>
                            </div>
                            <div className="a1">
                                <input id="password" name="account" type="password" placeholder="請再輸入一次密碼"/>
                            </div>
                            <div className="error-message">
                                <span>
                                    {errorMessage}
                                </span>
                            </div>
                        </div>
                        <div className="a1">
                            <button onClick={() => {handleLoginLogup()}}>立即註冊</button>
                        </div>
                    </div>
                </div>
                <div className = "LogPage-email-login">
                    
                </div>
            </div>
            :
            <div className="LogPage-log-part">
                <div className = "LogPage-normal-login">
                    <div className="a4">
                        <div className="a3">
                            <div className="a1">
                                <input id="account" name="account" type="text" placeholder="帳號"/>
                            </div>
                            <div className="a1">
                                <input id="password" name="account" type="password" placeholder="密碼"/>
                            </div>
                            <div className="error-message">
                                <span>
                                    {errorMessage}
                                </span>
                            </div>
                        </div>
                        <div className="a1">
                            <button onClick={() => {handleLoginLogup()}}>立即登入</button>
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
            <div className = "LogInterface" style={logInterfaceSize}>
                <TopBanner />
                <MiddleContent />
                <Footer />
            </div>
		</div>
    )
}

export default LogPage;
