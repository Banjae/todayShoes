import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div>
        <span>아이디</span>
        <form>
          <input placeholder="아이디를 입력하세요" />
        </form>
      </div>
      <div>
        <span>비밀번호</span>
        <form>
          <input placeholder="비밀번호를 입력하세요" />
        </form>
      </div>
      <div>
        <Link to="/SignUp">회원가입</Link>
      </div>
    </>
  );
};

export default Login;
