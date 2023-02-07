const queue= require('../config/kue');

const commentMailer= require('../mailers/comments_mailers');

queue.process('emails',function(job,done){
    console.log('email workers processing the job ',job.data);

    commentMailer.newComment(job.data);

    done();
})