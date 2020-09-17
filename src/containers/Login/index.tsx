import React, { useState, useEffect, Fragment } from "react"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { Link, Redirect } from "react-router-dom"
import {
  actionFns as userFns,
  ConstantTypes as UserConstantTypes,
} from "../../redux/modules/user"
import { RootState } from "../../redux/configStore"
import bgImg from "./background.jpg"

const Container = styled.div<{ bgImg: string }>`
  height: 100vh;
  background-image: url('${(props) => props.bgImg}');
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #8d9297;
`
const LoginContainer = styled.div`
  width: 480px;
  height: 404px;
  padding: 32px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  background-color: #36393f;
  position: relative;
`

const UserInput = styled.input`
  color: #000;
  width: 416px;
  height: 40px;
  padding: 10px;
  background-color: #e8f0fe;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  outline: 0;
  transition: border-color 0.2s ease-in-out;
  &:hover {
    border-color: #000;
  }
`

const Label = styled.p`
  padding-top: 10px;
  margin-bottom: 8px;
`

const Title = styled.p`
  height: 50px;
  padding: 10px 0;
  text-align: center;
  font-weight: 600;
  font-size: 24px;
  color: #e3e3e4;
`

const Tip = styled.p`
  color: red;
  margin: 0;
  position: absolute;
  top: 95px;
`

const LoginBtn = styled.div`
  width: 416px;
  height: 40px;
  margin-top: 20px;
  background-color: #7288da;
  color: #e3e3e4;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const RegisterContainer = styled.div`
  width: 416px;
  height: 18px;
  margin-top: 6px;
`

function Login() {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const isValid = useSelector((state: RootState) => state.user.isValid)
  const errMsg = useSelector((state: RootState) => state.user.errorMsg)
  const token = localStorage.getItem("token")
  useEffect(() => {
    if (!isValid && token) {
      dispatch({ type: UserConstantTypes.TOKEN_AUTH })
    }
  }, [dispatch, isValid, token])
  return (
    <Fragment>
      {isValid ? (
        <Redirect to={{ pathname: "/app" }} />
      ) : token ? (
        "loading"
      ) : (
        <Container bgImg={bgImg}>
          <LoginContainer>
            <Title>欢迎回来</Title>
            <Tip>{errMsg}</Tip>
            <Label>用户名</Label>
            <UserInput
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Label>密码</Label>
            <UserInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <LoginBtn
              onClick={() => dispatch(userFns.loginStart(username, password))}
            >
              登入
            </LoginBtn>
            <RegisterContainer>
              测试用账户1: admin 123
              测试用账户1: root 123
              {/* <Link to="/register">注册</Link> */}
            </RegisterContainer>
          </LoginContainer>
        </Container>
      )}
    </Fragment>
  )
}

export default React.memo(Login)
