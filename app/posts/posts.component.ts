import {Component, OnInit} from '@angular/core';

import {PostService} from './post.service';
import {UserService} from '../users/user.service';
import {SpinnerComponent} from '../shared/spinner.component';
import {PaginationComponent} from '../shared/pagination.component';

@Component({
    templateUrl: 'app/posts/posts.component.html',
    styles: [`
    `],
    providers: [PostService, UserService],
    directives: [SpinnerComponent, PaginationComponent]
})
export class PostsComponent implements OnInit {
	posts = [];
    pagedPosts = [];
    users = [];
    postsLoading;
    commentsLoading;
    currentPost;
    pageSize = 10;
    
    constructor(
        private _postService: PostService,
        private _userService: UserService) {
	}

	ngOnInit() {
        this.loadUsers();
        this.loadPosts();        
	}
    
    private loadUsers(){
        this._userService.getUsers()
            .subscribe(users => this.users = users);
    }
    
    private loadPosts(filter?){
        this.postsLoading = true; 
		this._postService.getPosts(filter)
			.subscribe(
                posts => {
                    this.posts = posts;
                    this.pagedPosts = _.take(this.posts, this.pageSize);
                },
                null,
                () => { this.postsLoading = false; });
    }
    
    reloadPosts(filter){
        this.currentPost = null;
        
        this.loadPosts(filter);
    }
    
    select(post){
		this.currentPost = post; 
        
        this.commentsLoading = true;
        this._postService.getComments(post.id)
			.subscribe(
                comments => 
                    this.currentPost.comments = comments,
                null,
                () => this.commentsLoading = false); 
    } 
    
	onPageChanged(page) {
        var startIndex = (page - 1) * this.pageSize;
        this.pagedPosts = _.take(_.rest(this.posts, startIndex), this.pageSize);
	}
}