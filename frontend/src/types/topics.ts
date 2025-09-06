export {};

declare global {
  interface Question {
    id:string;
    questionName: string;
    difficulty: "Easy" | "Medium" | "Hard";
    link: string;
  }
  interface topicData {
    id: string;
    title: string;
    description: string;
  }

   type updateTopic = Omit<topicData,'id'>;
   type QuestionForm = Omit<Question,'id'>

}