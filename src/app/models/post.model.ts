export class Post {
    postId?: any;
    businessImpact?: any;
    businessUnit?: any;
    createdAt?: DateTimeFormat;
    challengeArea?: any;
    createdBy?: string;
    description?: any;
    title: string;
    technologies?: any;
    status?: any;
    updatedAt?: any;
    estimatedTime?: any;
}

export class UserPostMap {
    appliedUserId?: string;
    appliedUserComment: string;
    appliedUserETA: string;
    postId: string;
    appliedAt?: string;
    isAssigned?: boolean;
    award?: boolean;
    approvedAt?: string;
    userpostMapId: string;
    completed:boolean;    
}
