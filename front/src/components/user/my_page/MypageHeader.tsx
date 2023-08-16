import React, { useState, useEffect, useRef } from "react";

//css
import mypageHeaderStyle from "./MypageHeader.module.css";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
  action_mypage,
  changeFollowModalOpen,
  changeFollowMode,
  changeManageType,
  changeMenuMode,
  changeFollowModalMode,
  changeBadgeUpdateModalOpen,
} from "../../../store/MypageSlice";

import { useParams } from "react-router-dom";

//api
import {ifBlackList} from "../../../hook/UserApi"


const MypageHeader = () => {

  //redux 관리
  let state = useSelector((state: any) => state.mypage);
  let dispatch = useDispatch();
  
  const loginUser = JSON.parse(window.sessionStorage.getItem("loginUser"));
  const { watchingUserId } = useParams();
  
  let getBlackList = (watchingUserId: number) => {
    dispatch(action_mypage.getBlackList(watchingUserId));
  };

  const [followingData, setFollowingData] = useState({
    id: 0,
    targetId: 0,
    nickname: "",
    profileImg: "",
    gender: "",
    showBadgeType : ""
  });

  const changeFollowingData = () => {
    setFollowingData({
      id: loginUser.id,
      targetId: Number(watchingUserId),
      nickname: state.targetUser.nickname,
      profileImg: state.targetUser.profileImg,
      gender: state.targetUser.gender,
      showBadgeType: state.targetUser.showBadgeType
    });
  };

  const [deleteFollowingData, setDeleteFollowingData] = useState({
    id: 0,
    targetId: 0,
    nickname: "",
    profileImg: "",
    gender: "",
    showBadgeType: ""
  });

  const changeDeleteFollowingData = () => {
    setDeleteFollowingData({
      id: loginUser.id,
      targetId: Number(watchingUserId),
      nickname: state.targetUser.nickname,
      profileImg: state.targetUser.profileImg,
      gender: state.targetUser.gender,
      showBadgeType: state.targetUser.showBadgeType
    });
  };

  const [addBlackListData, setAddBlackListData] = useState({
    id: 0,
    targetId: 0,
    nickname: "",
    profileImg: "",
    gender: "",
    showBadgeType: ""
  });

  const changeAddBlackListData = () => {
    setAddBlackListData({
      id: loginUser.id,
      targetId: Number(watchingUserId),
      nickname: state.targetUser.nickname,
      profileImg: state.targetUser.profileImg,
      gender: state.targetUser.gender,
      showBadgeType: state.targetUser.showBadgeType
    });
  };

  const [deleteBlackListData, setDeleteBlackListData] = useState({
    id: 0,
    targetId: 0,
    nickname: "",
    profileImg: "",
    gender: "",
    showBadgeType: ""
  });

  const changeDeleteBlackListData = () => {
    setDeleteBlackListData({
      id: loginUser.id,
      targetId: Number(watchingUserId),
      nickname: state.targetUser.nickname,
      profileImg: state.targetUser.profileImg,
      gender: state.targetUser.gender,
      showBadgeType: state.targetUser.showBadgeType
    });
  };

  // 프로필 이미지 수정 로직
  const [Image, setImage] = useState(loginUser.profileImg)
  const [File, setFile] = useState(loginUser.profileImg)
  const fileInput = useRef(null)

  //프로필 이미지 수정
  const onChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        console.log(reader.result)
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setImage(state.targetUser.profileImg);

    }
  };

  // useEffect(() => {
  //   dispatch(action_mypage.getTargetUser(Number(watchingUserId)))
  // }, [])

  // let currentBadge = JSON.parse(sessionStorage.getItem("loginUser")).showBadgeType;

  // useEffect(() => {
  //   if(state.targetUser.id === 0)
  //     return;

  //   console.log(state.targetUser.showBadgeType)
  //   // currentBadge = state.targetUser.showBadgeType;
  //   dispatch(saveShowBadge(Number(watchingUserId)));
  //   console.log(state.showBadge)
  // }, [state.targetUser])

  useEffect(() => {
    dispatch(action_mypage.getShowBadge(Number(watchingUserId)));
  }, [])

  // 팔로우
  useEffect(
    () => {
      if (followingData.id === 0 || followingData.targetId === 0) return;

      dispatch(action_mypage.follow(followingData));
    },
    [followingData]
  );

  // 팔로우 끊기
  useEffect(
    () => {
      if (deleteFollowingData.id === 0 || deleteFollowingData.targetId === 0)
        return;

      dispatch(action_mypage.unfollow(deleteFollowingData));
    },
    [deleteFollowingData]
  );

  // 블랙리스트 등록
  useEffect(
    () => {
      if (addBlackListData.id === 0 || addBlackListData.targetId === 0) return;

      dispatch(action_mypage.addBlackList(addBlackListData));
    },
    [addBlackListData]
  );

  // 블랙리스트 해제
  useEffect(
    () => {
      if (deleteBlackListData.id === 0 || deleteBlackListData.targetId === 0)
        return;

      dispatch(action_mypage.deleteBlackList(deleteBlackListData));
    },
    [deleteBlackListData]
  );

  const checkFollowing = () => {
    for (let i = 0; i < state.myFollowingUsers.length; i++) {
      if (Number(watchingUserId) === state.myFollowingUsers[i].id) return true;
    }

    return false;
  };

  const checkBlackList = () => {
    console.log(state.blackListUsers);

    for (let i = 0; i < state.blackListUsers.length; i++) {
      if (Number(watchingUserId) === state.blackListUsers[i].targetUserId) {
        return true;
      }
    }

    return false;
  };

  useEffect(
    () => {
      if (
        state.myFollowingUsers.length === 0 ||
        state.blackListUsers.length === 0
      )
        return;

      checkFollowing();
      checkBlackList();
    },
    [state.blackListUsers, state.myFollowingUsers]
  );

  // 성별
  function genderColor(gender){
    console.log(gender)

    if(gender==="FEMALE"){
        return `${mypageHeaderStyle.profileImgF}`
    }else{
        return `${mypageHeaderStyle.profileImgM}`
    }

  }

  let isBlacklist = false
  ifBlackList(loginUser.id, watchingUserId ).then((res)=>(isBlacklist =res))
  
  return (
    <div className={`${mypageHeaderStyle.total}`}>

      {/* 타이틀 */}
      <div className={`${mypageHeaderStyle.title}`}>MYPAGE</div>

      {/* 프로필 사진 & 뱃지 사진 & 닉네임 */}
  
      <div className={`${mypageHeaderStyle.userInfo}`}>
        <div>
          {loginUser.id===Number(watchingUserId)?
          <div className={`${genderColor(state.targetUser.gender)}`}>
          {/* <div className={`${mypageHeaderStyle.profile}`}> */}
            <img src={Image} onClick={()=>{fileInput.current.click()}} />
            <input type='file' style={{display:'none'}} accept='image/jpg,image/png,image/jpeg' name='profile_img'
              onChange={(e)=>onChange(e)} ref={fileInput}/>
          </div>
          :
          <div className={`${genderColor(state.targetUser.gender)}`}>
          {/* <div className={`${mypageHeaderStyle.profile}`}> */}
            <img src={Image} />
          </div>}

          {/* 뱃지 */}  
          <div className={`${mypageHeaderStyle.profile_badge}`}>
            {state.showBadge==="X" && loginUser.id === Number(watchingUserId)?<div onClick={()=>{
              dispatch(changeBadgeUpdateModalOpen(true))
            }} className={`${mypageHeaderStyle.noBadge}`}></div>:null}

            {state.showBadge==="LOVELY"?<img onClick={()=>{
              if(loginUser.id === Number(watchingUserId)) {
                dispatch(changeBadgeUpdateModalOpen(true))
              }
            }} src={process.env.PUBLIC_URL + `/img/badge/Lovely_colored.png`} />:null}

            {state.showBadge==="NATURAL"?<img onClick={()=>{
              if(loginUser.id === Number(watchingUserId)) {
                dispatch(changeBadgeUpdateModalOpen(true))
              }
            }} src={process.env.PUBLIC_URL + `/img/badge/Natural_colored.png`} />:null}

            {state.showBadge==="MODERN"?<img onClick={()=>{
              if(loginUser.id === Number(watchingUserId)) {
                dispatch(changeBadgeUpdateModalOpen(true))
              }
            }} src={process.env.PUBLIC_URL + `/img/badge/Modern_colored.png`}/>:null}

            {state.showBadge==="SEXY"?<img onClick={()=>{
              if(loginUser.id === Number(watchingUserId)) {
                dispatch(changeBadgeUpdateModalOpen(true))
              }
            }} src={process.env.PUBLIC_URL + `/img/badge/Sexy_colored.png`}/>:null}

          </div>
        </div>

        <div className={`${mypageHeaderStyle.nickname}`}>
          {state.targetUser.nickname}
        </div>
      </div>

      {/* 버튼 2~3개 */}
      {state.mypageMode === 2
        ? <div className={`${mypageHeaderStyle.btns}`}>
            <button
              onClick={() => {
                dispatch(changeManageType(1));
                dispatch(changeMenuMode(1));
              }}
            >
              기본정보
            </button>
            <button>팔로우</button>
            <button>대화</button>
            <button
                  onClick={() => {isBlacklist?
                    window.location.href = `${process.env.REACT_APP_FRONT}/closet/${watchingUserId}`:
                    alert("접근할 수 없습니다.")
                  }}
                  className={ isBlacklist ?`${mypageHeaderStyle.btnsBlackList}`:""}
                >
                  옷장 보기 
                </button>
          </div>
        : <div className={`${mypageHeaderStyle.btns}`}>
            <button
              onClick={() => {
                dispatch(changeManageType(1));
                dispatch(changeMenuMode(1));
              }}
            >
              기본정보
            </button>
            {loginUser.id === Number(watchingUserId)
              ? <button
                  onClick={() => {
                    dispatch(changeManageType(2));
                    dispatch(changeMenuMode(3));
                  }}
                  style={
                    state.menuMode === 3
                      ? { backgroundColor: "#EAA595", color: "white" }
                      : null
                  }
                >
                  내 정보 관리
                </button>
              : checkFollowing()
                ? <button
                    onClick={() => {
                      changeDeleteFollowingData();
                      dispatch(action_mypage.getPerfectFollowList());
                    }}
                  >
                    팔로잉 취소
                  </button>
                : <button
                    onClick={() => {
                      changeFollowingData();
                      dispatch(action_mypage.getPerfectFollowList());
                    }}
                  >
                    팔로잉하기
                  </button>}
            {loginUser.id === Number(watchingUserId)
              ? <button
                  onClick={() => {
                    dispatch(changeFollowMode(3));
                    dispatch(changeFollowModalOpen(true));
                    dispatch(changeFollowModalMode(3));
                  }}
                >
                  블랙리스트 관리
                </button>
              : checkBlackList()
                ? <button
                    onClick={() => {
                      changeDeleteBlackListData();
                      dispatch(action_mypage.getBlackList(loginUser.id));
                    }}
                  >
                    블랙리스트 취소
                  </button>
                : <button
                    onClick={() => {
                      changeAddBlackListData();
                      dispatch(action_mypage.getBlackList(loginUser.id));
                    }}
                  >
                    블랙리스트 등록
                  </button>}
                  <button
                  onClick={() => {isBlacklist?
                    window.location.href = `${process.env.REACT_APP_FRONT}/closet/${watchingUserId}`:
                    alert("접근할 수 없습니다.")
                  }}
                  className={ isBlacklist ?`${mypageHeaderStyle.btnsBlackList}`:""}
                >
                  옷장 보기 
                </button>

          </div>}
    </div>
  );
};

export default MypageHeader;
