async function commentFormHadler(event){
    event.preventDefault();

    const comment_test = document.querySelector('textarea[name="comment-body "]').value.trim();
    
    const post_id =window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (comment_test){
        const response =await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_test
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok){
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }

}

document.querySelector('.comment-form').addEventListener('submit', commentFormHadler);