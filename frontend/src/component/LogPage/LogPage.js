import './LogPage.css'
import React, { useEffect, useRef, useState } from 'react'
import { USER_QUERY, ADD_USER } from '../../graphql'
import { useQuery, useMutation } from '@apollo/react-hooks'

function LogPage(prop){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [nickName, setNickName] = useState('');
    const [account, setAccount] = useState('');
    const [password, setPassWord] = useState('');
    const [pwCheck, setPWCheck] = useState('');
    const {data: user, refetch: reUser} = useQuery(USER_QUERY, {variables: {account: account, password: password}});
    const [addUser] = useMutation(ADD_USER);
    const [errorType, setErrorType] = useState(0); //0: no error | 1: account or password incorrect | 2:incomplete form | 3:password reconfirm failed | 4:the account already exists
    const errorMessage = (errorType === 4) ? "*此帳號已存在*" :
                         (errorType === 3) ? "*兩次輸入的密碼不相符*" :
                         (errorType === 2) ? "*有空格未完成*" :
                         (errorType === 1) ? "*帳號或密碼輸入錯誤*":
                         "";
    const logInterfaceSize = {
        height: (prop.loginLogup === 2) ? "65vh" : "50vh",
        width: (prop.loginLogup === 2) ? "40%" : "40%",
    }
    const logPageStyle = (prop.loginLogup === 0) ? "LogPage disable" : "LogPage";
    const TopBanner = () => {
        return(
            <div className = "LogPage-topbanner">
                <span id = "b1"></span>
                <span id = "b2">{(prop.loginLogup === 2) ? "建立您的帳戶" : "歡迎回來"}</span>
                <span id = "b3" onClick={() => {setErrorType(0); prop.setLoginLogup(0)}}>×</span>
            </div>
        )
    }
    const changeFirstName = (e) =>  setFirstName(e.target.value)
    const changeLastName = (e) => setLastName(e.target.value)
    const changeNickName = (e) => setNickName(e.target.value)
    const changeAccount = (e) => setAccount(e.target.value)
    const changePassword = (e) => setPassWord(e.target.value)
    const changePWCheck = (e) => setPWCheck(e.target.value) 
    const changePage = (state) => {
        setFirstName('')
        setLastName('')
        setAccount('')
        setPassWord('')
        setPWCheck('') 
        setErrorType(0)
        prop.setLoginLogup(state)
    }
    const handleLogin = async () => {
        if(account==='' || password === '') setErrorType(2)
        else{
            if(user.user.valid){
                console.log("in")
                setErrorType(0)
                prop.setUsername([user.user.first_name, user.user.last_name])
                prop.setAccount(user.user.account)
                setFirstName('')
                setLastName('')
                setAccount('')
                setPassWord('')
                setPWCheck('') 
                prop.setLoginState(true)
                prop.setLoginLogup(0)
            }
            else{
                setErrorType(1)
            }
        }
        setPassWord('')
    }
    const handleLogup = async () => {
        if(firstName === '' || lastName === '' || account === '' || password === '' || pwCheck === ''){
            setErrorType(2)
        }
        else if(password !== pwCheck){
            setErrorType(3)
        }
        else{
            let res = await addUser({
                variables: {
                    first_name: firstName,
                    last_name: lastName,
                    name: nickName,
                    account: account,
                    password: password
                }
            })
            if(res.data.addUser === "register success."){
                setErrorType(0)
                prop.setUsername([firstName, lastName])
                prop.setAccount(account)
                setFirstName('')
                setLastName('')
                setAccount('')
                setPassWord('')
                setPWCheck('') 
                prop.setLoginState(true)
                prop.setLoginLogup(0)
            }
            else setErrorType(4)
        }
        setPassWord('')
        setPWCheck('')
    }
    const Footer = () => {
        return(
            (prop.loginLogup === 2) ? 
            <div className = "LogPage-footer">
                <span>
                    已有帳戶了嗎？
                </span>
                <button onClick={() => changePage(1)}>立即登入</button>
            </div>
            :
            <div className = "LogPage-footer">
                <span>
                    您是新用戶嗎？
                </span>
                <button onClick={() => changePage(2)}>立即建立帳戶</button>
            </div>
        )
    }

    useEffect(() => {
        reUser()
    }, [account, password])

    return(
        <div className = {logPageStyle}>
            <div className = "LogInterface" style={logInterfaceSize}>
                <TopBanner />
                {
                    (prop.loginLogup === 2) ?
                    <div className="LogPage-log-part">
                        <div className = "LogPage-normal-logup">
                            <div className="a4">
                                <div className="a3">
                                    <div className="a2">
                                        <div className="a1">
                                            <input id="first-name" value={firstName} placeholder="名字" onChange={changeFirstName} />
                                        </div>
                                        <div className="a1">
                                            <input value={lastName} placeholder="姓氏" onChange={changeLastName} />
                                        </div>
                                    </div>
                                    <div className="a1">
                                        <input value={nickName} placeholder="暱稱" onChange={changeNickName}/>
                                    </div>
                                    <div className="a1">
                                        <input value={account} placeholder="帳號" onChange={changeAccount}/>
                                    </div>
                                    <div className="a1">
                                        <input value={password} placeholder="密碼" onChange={changePassword}/>
                                    </div>
                                    <div className="a1">
                                        <input value={pwCheck} placeholder="請再輸入一次密碼" onChange={changePWCheck}/>
                                    </div>
                                    <div className="error-message">
                                        <span>
                                            {errorMessage}
                                        </span>
                                    </div>
                                </div>
                                <div className="a1">
                                    <button onClick={handleLogup}>立即註冊</button>
                                </div>
                            </div>
                        </div>
                        {/* <div className = "LogPage-email-login">
                            
                        </div> */}
                    </div>
                    :
                    <div className="LogPage-log-part">
                        <div className = "LogPage-normal-login">
                            <div className="a4">
                                <div className="a3">
                                    <div className="a1">
                                        <input value={account} placeholder="帳號" onChange={changeAccount} />
                                    </div>
                                    <div className="a1">
                                        <input value={password} placeholder="密碼" onChange={changePassword} />
                                    </div>
                                    <div className="error-message">
                                        <span>
                                            {errorMessage}
                                        </span>
                                    </div>
                                </div>
                                <div className="a1">
                                    <button onClick={handleLogin}>立即登入</button>
                                </div>
                            </div>
                        </div>
                        {/* <div className = "LogPage-email-login">
                            
                        </div> */}
                    </div>
                }
                <Footer />
            </div>
		</div>
    )
}

export default LogPage;
