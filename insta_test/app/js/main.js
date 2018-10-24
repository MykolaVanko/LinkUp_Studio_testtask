document.addEventListener('DOMContentLoaded', function () {

    fetch('https://5b27755162e42b0014915662.mockapi.io/api/v1/posts')
        .then(res => {
            if (res.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
            }
            return data = res.json()
        })
        .then((data) => {
            //http://lorempixel.com не працюва тому я використав
            //інший ресурс
            let counter = 1;
            for (let item of data) {
                createPost(item, counter);
                counter++
                // let post = document.createElement('div');
                //     post.classList.add('post');
                //
                //     let user = document.createElement('div');
                //         user.classList.add('user');
                //         user.setAttribute('id', item.id);
                //         let avatar = document.createElement('div');
                //             avatar.classList.add('avatar');
                //             let avatarImg = document.createElement('img');
                //                 avatarImg.src = item.avatar;
                //                 avatarImg.style.height = 16+'px';
                //              let span = document.createElement('span');
                //                 span.classList.add('user-name');
                //                 span.innerHTML = item.userName;
                //          avatar.appendChild(avatarImg);
                //          avatar.appendChild(span);
                //          let dots = document.createElement('img');
                //             dots.src = 'app/img/dots.png';
                //     user.appendChild(avatar, dots);
                //     user.appendChild(dots);
                //
                //     let postPhoto = document.createElement('div');
                //         postPhoto.classList.add('post-photo');
                //         let postImg = document.createElement('img');
                //             postImg.src = `https://picsum.photos/640/480/?image=${counter}`;
                //         postPhoto.appendChild(postImg);
                //
                //     let postOption = document.createElement('div');
                //         postOption.classList.add('post-options');
                //         let like = document.createElement('div');
                //             like.classList.add('like');
                //             let heartFull = document.createElement('img');
                //                 heartFull.src = 'app/img/if_heart-full.png';
                //                 heartFull.classList.add('full', 'hidden');
                //             let heartEmpty = document.createElement('img');
                //                 heartEmpty.src = 'app/img/empty-heart.png';
                //                 heartEmpty.classList.add('empty');
                //             like.appendChild(heartFull);
                //             like.appendChild(heartEmpty);
                //         let addComment = document.createElement('div');
                //             addComment.classList.add('add-comment');
                //             let addCommentImg = document.createElement('img');
                //                 addCommentImg.src = 'app/img/comment.png';
                //             addComment.appendChild(addCommentImg);
                //         postOption.appendChild(like);
                //         postOption.appendChild(addComment);
                //
                //     let likesCounter = document.createElement('p');
                //         likesCounter.classList.add('font-w600', 'likes-counter');
                //        likesCounter.innerHTML = `${item.likes} вподобань`;
                //
                //
                //     let postDescr = document.createElement('p');
                //         postDescr.classList.add('post-descr');
                //         postDescr.innerText = 'Lorem ipsum dolor sit amet.';
                //
                //     //create comment and give them class hidden, except first two
                //     let ul = document.createElement('ul');
                //         ul.classList.add('comments');
                //         for (let i = 0; i <= 5; i++) {
                //             if (i >= 2){
                //                 let li = document.createElement('li');
                //                     li.classList.add('hidden');
                //                     li.innerText = 'Lorem ';
                //                 let commentSpan = document.createElement('span');
                //                     commentSpan.classList.add('font-w400');
                //                     commentSpan.innerText = ' ipsum dolor sit amet, consectetur sit amet, consectetur.';
                //                 li.appendChild(commentSpan);
                //                 ul.appendChild(li);
                //             } else {
                //                 let li = document.createElement('li');
                //                      li.innerText = 'Lorem ';
                //                 let commentSpan = document.createElement('span');
                //                     commentSpan.classList.add('font-w400');
                //                     commentSpan.innerText = ' ipsum dolor sit amet, consectetur sit amet, consectetur.';
                //                 li.appendChild(commentSpan);
                //                 ul.appendChild(li);
                //             }
                //         }
                //
                //     let showMore = document.createElement('span');
                //         showMore.classList.add('show-more');
                //         showMore.innerHTML = '... показати більше';
                //
                //     let postDate = document.createElement('span');
                //         postDate.classList.add('date');
                //     let date = Date.parse(item.createdAt)/1000;
                //         postDate.innerHTML = `${intervalDays(date)}`;
                //
                //
                // post.appendChild(user);
                // post.appendChild(postPhoto);
                // post.appendChild(postOption);
                // post.appendChild(likesCounter);
                // post.appendChild(postDescr);
                // post.appendChild(showMore);
                // post.appendChild(ul);
                // post.appendChild(postDate);
                //
                //
                // wall.appendChild(post);
                // counter++;
            }
        })
        .then(() => {
            addClickEvent()
        })
        .catch(error => console.log('Fetch error ', error))

});

//find post time
function intervalDays(past) {
    let time;
    let myDate = Date.parse(new Date()) / 1000;
    let interval = Math.floor(myDate - past);
    let minut = Math.floor(interval / 60);
    let hour = Math.floor(minut / 60);
    let day = Math.floor(hour / 24);
    let week = Math.floor(day / 7);

    return minut < 60 ? minut + ' хвилин тому' :
        hour < 24 ? hour + ' годин тому' :
            day < 7 ? day + 'днів тому' : week + ' тижнів тому';

}


//likes
let heartFull = document.getElementsByClassName('full');
let heartEmpty = document.getElementsByClassName('empty');
let showMoreColection = document.getElementsByClassName('show-more');
let dots = document.getElementsByClassName('dots');
let deletePostBtn = document.getElementsByClassName('delete-post');

function addClickEvent() {

    let comArr = [];
    for (let i = 0; i < heartFull.length; i++) {
        heartFull[i].addEventListener('click', dislike)
    }
    for (let i = 0; i < heartEmpty.length; i++) {
        heartEmpty[i].addEventListener('click', like)
    }
    for (let i = 0; i < showMoreColection.length; i++) {
        showMoreColection[i].addEventListener('click', showMore)
    }
    for (let i = 0; i < dots.length; i++){
        dots[i].addEventListener('click', showDeleteBtn)
    }
    for (let i = 0; i < deletePostBtn.length; i++){
        deletePostBtn[i].addEventListener('click', deletePost)
    }


}


//add Like
function like() {
    this.classList.add('hidden');
    this.previousElementSibling.classList.remove('hidden');
    let counter = this.parentElement.parentElement.parentElement.childNodes[3];
    counter.innerText = parseFloat(counter.innerText) + 1 + ' вподобань';
}

//remove Like
function dislike() {
    this.classList.add('hidden');
    this.nextElementSibling.classList.remove('hidden');
    let counter = this.parentElement.parentElement.parentElement.childNodes[3];
    counter.innerText = parseFloat(counter.innerText) - 1 + ' вподобань';
}

//show more comments
function showMore() {
    let list = this.parentElement.children[6].children;
    if (list[3].classList.contains('hidden')) {
        for (let i = 2; i < list.length; i++) {
            list[i].classList.remove('hidden')
        }
        this.innerText = '... сховати'
    } else {
        for (let i = 2; i < list.length; i++) {
            list[i].classList.add('hidden')
        }
        this.innerText = '... показати більше'
    }
}
//create new post
function createPost(item, counter) {
    let imgSrc = `https://picsum.photos/640/480/?image=${counter}`;
        if (item.imageUrlNew) {
            imgSrc = item.imageUrlNew
        }
    let newPostDescr = 'Lorem ipsum dolor sit amet.';
        if (item.descr) {
            newPostDescr = item.descr
        }

    let wall = document.getElementsByClassName('wall')[0];
        let post = document.createElement('div');
        post.classList.add('post');

            let user = document.createElement('div');
            user.classList.add('user');
            user.setAttribute('id', item.id);
                let avatar = document.createElement('div');
                avatar.classList.add('avatar');
                    let avatarImg = document.createElement('img');
                        avatarImg.src = item.avatar;
                        avatarImg.style.height = 16 + 'px';
                    let span = document.createElement('span');
                        span.classList.add('user-name');
                        span.innerHTML = item.userName;
                avatar.appendChild(avatarImg);
                avatar.appendChild(span);
                let dots = document.createElement('img');
                    dots.classList.add('dots')
                    dots.src = 'app/img/dots.png';
                let deletePost = document.createElement('h5');
                    deletePost.classList.add('delete-post', 'hidden');
                    deletePost.setAttribute('data-user-id', item.id);
                    deletePost.innerText = 'Видалити';

            user.appendChild(avatar);
            user.appendChild(dots);
            user.appendChild(deletePost);

        let postPhoto = document.createElement('div');
        postPhoto.classList.add('post-photo');
            let postImg = document.createElement('img');
            postImg.src = imgSrc;
        postPhoto.appendChild(postImg);

        let postOption = document.createElement('div');
            postOption.classList.add('post-options');
            let like = document.createElement('div');
                like.classList.add('like');
                    let heartFull = document.createElement('img');
                        heartFull.src = 'app/img/if_heart-full.png';
                        heartFull.classList.add('full', 'hidden');
                    let heartEmpty = document.createElement('img');
                        heartEmpty.src = 'app/img/empty-heart.png';
                        heartEmpty.classList.add('empty');
                like.appendChild(heartFull);
                like.appendChild(heartEmpty);
            let addComment = document.createElement('div');
                addComment.classList.add('add-comment');
            let addCommentImg = document.createElement('img');
                addCommentImg.src = 'app/img/comment.png';
            addComment.appendChild(addCommentImg);
        postOption.appendChild(like);
        postOption.appendChild(addComment);

        let likesCounter = document.createElement('p');
            likesCounter.classList.add('font-w600', 'likes-counter');
            likesCounter.innerHTML = `${item.likes} вподобань`;


        let postDescr = document.createElement('p');
            postDescr.classList.add('post-descr');
            postDescr.innerText = newPostDescr;

    //create comment and give them class hidden, except first two
        let ul = document.createElement('ul');
        ul.classList.add('comments');
        for (let i = 0; i <= 5; i++) {
            if (i >= 2) {
                let li = document.createElement('li');
                li.classList.add('hidden');
                li.innerText = 'Lorem ';
                let commentSpan = document.createElement('span');
                commentSpan.classList.add('font-w400');
                commentSpan.innerText = ' ipsum dolor sit amet, consectetur sit amet, consectetur.';
                li.appendChild(commentSpan);
                ul.appendChild(li);
            } else {
                let li = document.createElement('li');
                li.innerText = 'Lorem ';
                let commentSpan = document.createElement('span');
                commentSpan.classList.add('font-w400');
                commentSpan.innerText = ' ipsum dolor sit amet, consectetur sit amet, consectetur.';
                li.appendChild(commentSpan);
                ul.appendChild(li);
            }
        }

        let showMore = document.createElement('span');
            showMore.classList.add('show-more');
            showMore.innerHTML = '... показати більше';

        let postDate = document.createElement('span');
            postDate.classList.add('date');
        let date = Date.parse(item.createdAt) / 1000;
            postDate.innerHTML = `${intervalDays(date)}`;


    post.appendChild(user);
    post.appendChild(postPhoto);
    post.appendChild(postOption);
    post.appendChild(likesCounter);
    post.appendChild(postDescr);
    post.appendChild(showMore);
    post.appendChild(ul);
    post.appendChild(postDate);


    wall.appendChild(post);
}

let addPostWindow = document.getElementsByClassName('add-post-photo')[0];
let addPost = document.getElementsByClassName('add-post')[0];
let postDescription = document.getElementById('description');
let postPhoto = document.getElementById('photo');
let photoConteiner = document.getElementsByClassName('photo-container')[0];

document.getElementById('new-post').onclick = function () {
   addPostWindow.classList.remove('hidden');
   addPost.classList.add('hidden')
};

//cancel adding post
function cancel() {
    addPostWindow.classList.add('hidden');
    addPost.classList.remove('hidden');
    postDescription.value = '';
    photoConteiner.firstElementChild.remove();
}

function getPhoto() {
    let input = postPhoto;
    if (input.files && input.files[0]) {
        if (input.files[0].type.match('image.*')) {
            var reader = new FileReader();
            reader.onload = function (e) {
                let img = document.createElement('img');
                    img.src = `${e.target.result}`;
                photoConteiner.appendChild(img)
            };
            reader.readAsDataURL(input.files[0]);
        } else {
            console.log('Error1');
        }
    } else {
        console.log('Error2');
    }
}
//confirm adding post
function confirmAddingPost() {
    let postDescr = document.getElementById('description').value;

    let postData =  {
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/txcx/128.jpg",
        createdAt: new Date(),
        id: 1651,
        likes: 1515,
        userName: "Ivan Kozak",
    };
    let image = document.getElementsByClassName('photo-container')[0].firstElementChild;
    postData.imageUrlNew = image.src;
    postData.descr =  postDescr;
    createPost(postData);
    addClickEvent();
    cancel();
}

function deletePost() {
    let userId = this.getAttribute('data-user-id');
    document.getElementById(userId).parentElement.remove()
}
//show delete button
function showDeleteBtn() {
    this.nextElementSibling.classList.remove('hidden')
}
//hide delete button
window.onclick = function (event) {
    for (let i = 0; i < deletePostBtn.length; i++) {
        if (event.target === deletePostBtn[i]){
            deletePostBtn[i].classList.add('hidden');
        }
    }
};