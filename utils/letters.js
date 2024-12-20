const { NODE_ENV, BASE_URL } = process.env;

const letterStyle = `<style>
@font-face {
   font-family: 'Eskal';
   src: url(${
     NODE_ENV === 'production'
       ? `${BASE_URL}/fonts/eskal.ttf`
       : 'https://vk.com/doc17555747_437656792'
   });
}
.main {
  background-image: url(${
    NODE_ENV === 'production'
      ? `${BASE_URL}/images/email-background.jpg`
      : 'https://www.onlygfx.com/wp-content/uploads/2017/12/turquoise-watercolor-texture-9.jpg'
  });
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 300px;
  padding: 20px;
}
.main__text {
  font-size: 28px;
  text-align: center;
  font-family: "Eskal", "Comic Sans MS", "Comic Sans", cursive;
  -webkit-text-stroke: .3px #FFF;
  text-stroke: .3px #FFF;
  font-style: italic;
}
a:hover {
  opacity: .8;
}
.main__works {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: right;
  gap: 10px
  }
.main__work {
  width: 145px;
  height: 145px;
  border: 1px solid blue;
  border-radius: 5px;

  }
.main__image {
width: 145px;
height: 145px;
object-fit: contain;
object-position: center
}

@media screen and (max-width: 426px) {
.main {
  padding: 10px}

.main__text {
  font-size: 18px}
}
</style>`;

const requestStyle = `<style>
@font-face {
   font-family: 'Eskal';
   src: url(${
     NODE_ENV === 'production'
       ? `${BASE_URL}/fonts/eskal.ttf`
       : 'https://vk.com/doc17555747_437656792'
   });
}
.main {
  min-height: 300px;
  padding: 20px;
}
.main__text {
  font-size: 16px;
  text-align: left;
  font-family: "Eskal", "Comic Sans MS", "Comic Sans", cursive;
  -webkit-text-stroke: .3px #FFF;
  text-stroke: .3px #FFF;
  font-style: italic;
}

.main__rubric {
font-weight: 600}

@media screen and (max-width: 426px) {
.main {
  padding: 10px}

.main__text {
  font-size: 14px}
}
</style>`;

const letterSignature = `<p class="main__text" style="text-align: right">Sabina Tari</p>
<p class="main__text" style="text-align: right">Artist | 3D Sculptor | Creative soul</p>
<p class="main__text" style="text-align: right; font-size: 16px">My latest works</p>
<div class="main__works">
<div class="main__work"><img class="main__image" src="https://placehold.co/400x600/violet/white" alt="Синяя картинка"></img></div>
<div class="main__work"><img class="main__image" src="https://placehold.co/600x400/green/white" alt="Зелёная картинка"></img></div>
</div>
`;

const confirmLetter = (user) => `${letterStyle}
<main class="main">
<p class="main__text">Hello, ${user.name}!</p>
<p class="main__text">Glad to welcome you in my art workshop!</p>
<p class="main__text">Please take a second to confirm your e-mail by following the link below:</p>
<p class="main__text"><a href=${
  NODE_ENV === 'production' ? BASE_URL : 'http://localhost:3001'
}/api/verify/${user._id}/${user.token}>E-mail confirmation</a></p>
${letterSignature}</main>`;

const resetPasswordLetter = (user) => `${letterStyle}
<main class="main">
<p class="main__text">Hello, ${user.name}!</p>
<p class="main__text">If you forgot your password and want to reset it, please follow the link below:</p>
<p class="main__text"><a href=${
  NODE_ENV === 'production' ? BASE_URL : 'http://localhost:3001'
}/api/reset/${user._id}/${user.token}>Password resetting</a></p>
<p class="main__text" style="font-size: 16px">If you didn't request password resetting, just ignore this letter.</p>
${letterSignature}</main>`;

const changeEmailLetter = (user) => `${letterStyle}
<main class="main">
<p class="main__text">Hello, ${user.name}!</p>
<p class="main__text">If you have changed your email please take a second to confirm it by following the link below:</p>
<p class="main__text"><a href=${
  NODE_ENV === 'production' ? BASE_URL : 'http://localhost:3001'
}/api/verify/${user._id}/${user.token}>E-mail confirmation</a></p>
<p class="main__text" style="font-size: 16px">If you didn't request email change, just ignore this letter.</p>
${letterSignature}</main>`;

const requestLetter = (request) => `${requestStyle}
<main class="main">
<p class="main__text"><span class="main__rubric">Поступил запрос о картине «${request.picture.name}»</span></p>
<p class="main__text"><span class="main__rubric">Автор запроса:</span> ${request.author}</p>
<p class="main__text"><span class="main__rubric">Заголовок запроса:</span> ${request.header}</p>
<p class="main__text"><span class="main__rubric">Текст запроса:</span> ${request.text}</p>
<p class="main__text"><span class="main__rubric">Контактный телефон:</span> ${request.telephone}</p>
<p class="main__text"><span class="main__rubric">Контактный адрес почты:</span> ${request.email}</p>
`;

module.exports = {
  confirmLetter,
  resetPasswordLetter,
  changeEmailLetter,
  requestLetter,
};
