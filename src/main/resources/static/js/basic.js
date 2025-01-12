let host = "http://localhost:8080"
$(document).ready(function () {
    const auth = getToken();

    if (auth !== undefined && auth !== '') {
        $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
            jqXHR.setRequestHeader('Authorization', auth);
        });
        showProfile();
        $("#login-button").hide();
    }
    //회원가입
    const signupButton = document.getElementById('signup-btn');

    if (signupButton) {
        signupButton.addEventListener('click', event => {

            fetch(`/user/signup`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: document.getElementById('email').value,
                    password: document.getElementById('password').value,
                    nickname: document.getElementById('nickname').value,
                })
            })
                .then(() => {

                    alert('회원가입 성공!');
                    location.replace('/user/login-page');


                });
        });
    }

    //인증코드 보내기
    const emailButton = document.getElementById('email-btn');

    if (emailButton) {
        emailButton.addEventListener('click', event => {

            fetch(`/user/mail`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: document.getElementById('email').value,
                })
            })
                .then((response) => {
                    if(response.ok){
                        $("#emailForm").hide();
                        $("#checkCodeForm").show();
                    } else {
                        alert('이미 등록된 Email 입니다.');
                        location.replace('/user/introduce');
                    }

                });
        });
    }

//인증코드 확인
    const checkCodeButton = document.getElementById('checkCode-btn');

    if (checkCodeButton) {
        checkCodeButton.addEventListener('click', event => {

            fetch(`/user/mailcompare`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: document.getElementById('email').value,
                    code: document.getElementById('checkCode').value,
                })
            })
                .then((response) => {
                    if(response.ok){
                        $("#checkCodeForm").hide();
                        $("#submitForm").show();
                    } else {
                        alert('인증코드가 틀렸습니다.');
                        location.replace('/user/sign-up');
                    }

                });
        });
    }


    // 생성 기능
    const createButton = document.getElementById('create-btn');

    if (createButton) {
        createButton.addEventListener('click', event => {
            fetch('/feed', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: document.getElementById('title').value,
                    url: document.getElementById('url').value,
                    contents: document.getElementById('content').value
                })
            })
                .then(() => {
                    alert('등록 완료되었습니다.');
                    location.replace('/');
                });
        });
    }


    // 수정 기능
    const modifyButton = document.getElementById('modify-btn');

    if (modifyButton) {
        modifyButton.addEventListener('click', event => {
            let params = new URLSearchParams(location.search);
            let id = params.get('feed_id');

            fetch(`/feed/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: document.getElementById('title').value,
                    url: document.getElementById('url').value,
                    contents: document.getElementById('content').value
                })
            })
                .then(() => {
                    alert('수정이 완료되었습니다.');

                    location.replace(`/`);
                });
        });
    }

    // 삭제 기능
    const deleteButton = document.getElementById('delete-btn');

    if (deleteButton) {
        deleteButton.addEventListener('click', event => {
            let params = new URLSearchParams(location.search);
            let id = params.get('feed_id');

            fetch(`/feed/${id}`, {
                method: 'DELETE'
            })
                .then(() => {
                    alert('삭제가 완료되었습니다.');
                    location.replace('/');
                });
        });
    }

    // 좋아요 기능
    const likeButton = document.getElementById('like-btn');

    if (likeButton) {
        likeButton.addEventListener('click', event => {
            let id = document.getElementById('feed-id').value;
            fetch(`/feed/${id}/like`, {
                method: 'POST'
            })
                .then(() => {
                    alert('좋아요 성공!');
                    location.replace('/');
                });
        });
    }
    //댓글 입력 기능
    const commentButton = document.getElementById('comment-btn');

    if (commentButton) {
        commentButton.addEventListener('click', event => {
            let id = document.getElementById('feed-id').value;
            fetch(`/comments/${id}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    comments: document.getElementById('comments').value,
                })
            })
                .then(() => {
                    alert('댓글달기 성공!');
                    location.replace('/');
                });
        });
    }

    // 댓글 수정 기능
    const commentUpdateButton = document.getElementById('commentUpdate-btn');

    if (commentUpdateButton) {
        commentUpdateButton.addEventListener('click', event => {
            let id = document.getElementById('comment-id').value;

            fetch(`/comments/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    comments: document.getElementById('comment').value,
                })
            })
                .then(() => {
                    alert('수정이 완료되었습니다.');

                    location.replace(`/`);
                });
        });
    }

    // 댓글 삭제 기능
    const commentDeleteButton = document.getElementById('commentDelete-btn');

    if (commentDeleteButton) {
        commentDeleteButton.addEventListener('click', event => {
            let id = document.getElementById('comment-id').value;

            fetch(`/comments/${id}`, {
                method: 'DELETE'
            })
                .then(() => {
                    alert('삭제가 완료되었습니다.');
                    location.replace('/');
                });
        });
    }

    // profile 수정 기능
    const modifyIntroButton = document.getElementById('modifyIntro-btn');

    if (modifyIntroButton) {
        modifyIntroButton.addEventListener('click', event => {

            fetch(`/introduce`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nickname: document.getElementById('nickname').value,
                    my_content: document.getElementById('mycontent').value
                })
            })
                .then(() => {
                    alert('수정이 완료되었습니다.');

                    location.replace(`/`);
                });
        });
    }


    //비밀번호 확인
    const checkPasswordButton = document.getElementById('checkPassword-btn');

    if (checkPasswordButton) {
        checkPasswordButton.addEventListener('click', event => {

            fetch(`/password`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    password: document.getElementById('checkPassword').value,
                })
            })
                .then((response) => {
                    if(response.ok){
                        $("#passwordForm").hide();
                        $("#newPasswordForm").show();
                    } else {
                        alert('비밀번호가 틀렸습니다.');
                        location.replace('/user/introduce');
                    }

                });
        });
    }

    //비밀번호 변경
    const newPasswordButton = document.getElementById('newPassword-btn');

    if (newPasswordButton) {
        newPasswordButton.addEventListener('click', event => {

            fetch(`/password`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    new_password: document.getElementById('newPassword').value,
                })
            })
                .then(() => {
                    alert('수정이 완료되었습니다.');
                    $("#newPasswordForm").hide();
                });
        });
    }
    // 폴더 생성 기능
    const folderCreateButton = document.getElementById('folderCreate-btn');

    if (folderCreateButton) {
        folderCreateButton.addEventListener('click', event => {
            fetch('/folder', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: document.getElementById('title').value,
                })
            })
                .then(() => {
                    alert('등록 완료되었습니다.');
                    location.replace('/');
                });
        });
    }



})

function getToken() {
    let auth = Cookies.get('Authorization');

    if(auth === undefined) {
        return '';
    }
    return auth;
}
function showProfile() {
    $.ajax({
        type: 'GET',
        url: `/user-info`,
        success: function (response) {
            $('#profile').empty();
            $('#profile').append(`
                <div class="header" style="float:left">
                    <div class="card-body p-5 text-center">
                        <a href ="/feeds/user=${response.user_id}"
                        class="logo" style="font-weight: 200; color: inherit">
                        <p>${response.nickname}</p>
                        <p>${response.myContent}</p></a><br>
                        <button type="button" style="width: 120px;" onclick="location.href='/feed'" class="btn btn-dark">Feed 추가</button><br><br>
                        <button type="button" style="width: 120px;" class="btn btn-light" onclick="location.href='/user/introduce'">프로필 수정</button><br><br>
                        <button type="button"style="width: 120px;"  class="btn btn-secondary" onclick="location.href='/user/loin-page'">로그아웃</button>
                    </div>
                </div>
            `)
        },
        error: function (error) {
            console.log('Error:', error);
        }
    })
}




