export class PostCreate {
  readonly content: string;
  readonly title: string;
}

export class PostUpdate extends PostCreate {}
