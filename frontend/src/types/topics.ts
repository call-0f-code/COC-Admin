export {};

declare global {
  interface Question {
    id:string;
    questionName: string;
    difficulty: "Easy" | "Medium" | "Hard";
    link: string;
  }
  interface Topic {
    id: string;
    title: string;
    description: string;
  }

   type TopicForm = Omit<Topic,'id'>;
   type QuestionForm = Omit<Question,'id'>;
}