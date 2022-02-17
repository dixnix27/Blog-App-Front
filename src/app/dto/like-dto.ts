export enum VoteType {
  UPVOTE,
  DOWNVOTE
}

export class LikeDto{
  voteType:VoteType;
  postId:number
}
