import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";
import styled from "styled-components";
import {
  containerStyle,
  leftContainerStyle,
  navBarStyle,
  rightContainerStyle,
  detailSettingStyle,
  navItemStyle,
} from "../GuildSetting";

import { ImgText, HiddenInput } from "../SelectNewOrJoin/components/NewGuild";

import { handleFileChange } from "../GuildSetting";
import { RootState } from "../../../../../../redux/configStore";
import { actionFns as userFns } from "../../../../../../redux/modules/user";
import { actionFns as topLayerFns } from "../../../../../../redux/modules/topLayerStatus";
const { confirm } = Modal;

const Container = styled.div`
  ${containerStyle}
`;

const LeftContainer = styled.div`
  ${leftContainerStyle}
`;

const NavBar = styled.div`
  ${navBarStyle}
`;

const RightContainer = styled.div`
  ${rightContainerStyle}
`;

const DetailSetting = styled.div`
  ${detailSettingStyle};
  position: relative;
  display: flex;
  flex-direction: column;
`;

const NameLabel = styled.div`
  color: #fff;
  font-size: 18px;
  margin-bottom: 10px;
`;

const UserInfo = styled.div`
  width: 580px;
  height: 180px;
  background-color: #292b2f;
  padding: 20px;
  border: 1px solid #292b2f;
  display: flex;
`;

const LeftInfo = styled.div`
  width: 100px;
  height: 274px;
  margin-right: 10px;
`;

const RightInfo = styled.div`
  width: 450px;
  height: 274px;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
`;

const ImgInputArea = styled.div`
  width: 100px;
  height: 162px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImgInputWrapper = styled.div<{ bgUrl: string }>`
  width: 100px;
  height: 100px;
  margin-bottom: 15px;
  overflow: hidden;
  position: relative;
  background-color: #7288da;
  background-image: url(${(props) => props.bgUrl});
  background-size: cover;
  color: #fff;
  border-radius: 50%;
  box-shadow: 0 0 0px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 255, 0.7);
  }
`;

const DisplayLabel = styled.button`
  cursor: pointer;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  opacity: 0;
`;

const NavItem = styled.div<{ current?: boolean }>`
  ${navItemStyle};
  cursor: ${(props) => (props.current ? "default" : "pointer")};
  background-color: ${(props) =>
    props.current ? props.theme.color.bgPannelActive : "transparent"};
  color: ${(props) => (props.current ? "#fff" : "#b9bbbe")};
  &:hover {
    background-color: ${(props) =>
      props.current
        ? props.theme.color.bgPannelActive
        : props.theme.color.bgPannelHover};
    color: #fff;
  }
`;

const TextInputArea = styled.div`
  height: 66px;
  flex: none;
`;

const LabelForInput = styled.div`
  margin-bottom: 10px;
  color: #8e9297;
`;

const TextInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px;
  border: 1px solid transparent;
  outline: none;
  color: #dddddd;
  background-color: #27282c;
  &:focus {
    border: 1px solid #7289da;
  }
`;

const SubmitButton = styled.button`
  width: 96px;
  height: 34px;
  padding: 2px 16px;
  background-color: #7289da;
  border: none;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
  align-self: flex-end;
  position: relative;
  left: -10px;
  bottom: 40px;
`;

const EscButton = styled.button`
  width: 36px;
  height: 36px;
  border: 2px solid #72767d;
  color: #fff;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  right: -20px;
  top: 60px;
  background-color: #36393f;

  &:hover {
    background-color: #46494f;
  }
`;

function logoutConfirm() {
  confirm({
    title: "提示",
    content: "确认退出此账户吗？",
    onOk() {
      localStorage.removeItem("token");
      document.location.replace("/login");
    },
    onCancel() {
      console.log("Cancel");
    },
  });
}

type Proptype = {
  hidden: boolean;
};

function UserSetting({ hidden }: Proptype) {
  const dispatch = useDispatch();
  const avatar = useSelector((state: RootState) => state.user.avatar);
  const name = useSelector((state: RootState) => state.user.name);
  const inputRef = useRef<HTMLInputElement>(null);
  const [bgUrl, setBgUrl] = useState("");
  const [value, setValue] = useState("");
  useEffect(() => {
    setBgUrl(avatar);
    setValue(name!);
  }, [avatar, name]);
  return (
    <Container hidden={hidden}>
      <LeftContainer>
        <NavBar>
          <NavItem current>基本信息</NavItem>
          <NavItem onClick={logoutConfirm}>登出</NavItem>
        </NavBar>
      </LeftContainer>
      <RightContainer>
        <DetailSetting>
          <NameLabel>我的账号</NameLabel>
          <UserInfo>
            <LeftInfo>
              <ImgInputArea>
                <ImgInputWrapper
                  bgUrl={bgUrl}
                  onClick={() => inputRef.current!.click()}
                >
                  <DisplayLabel />
                  <HiddenInput
                    ref={inputRef}
                    onChange={(e) =>
                      handleFileChange(e, (imgDataURL) => {
                        setBgUrl(imgDataURL);
                      })
                    }
                  />
                  {bgUrl === "" ? <ImgText>点击上传头像</ImgText> : ""}
                </ImgInputWrapper>
              </ImgInputArea>
            </LeftInfo>
            <RightInfo>
              <TextInputArea>
                <LabelForInput>使用者名称</LabelForInput>
                <TextInput
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </TextInputArea>
            </RightInfo>
          </UserInfo>
          <SubmitButton
            onClick={() => {
              const file = inputRef?.current?.files
                ? inputRef?.current?.files[0]
                : null;
              if (file) {
                dispatch(userFns.patchUser(value, file));
              } else {
                dispatch(userFns.patchUser(value));
              }
            }}
          >
            保存修改
          </SubmitButton>

          <EscButton
            onClick={() => dispatch(topLayerFns.toggleUserSettingLayer())}
          >
            X
          </EscButton>
        </DetailSetting>
      </RightContainer>
    </Container>
  );
}
export default React.memo(UserSetting);
