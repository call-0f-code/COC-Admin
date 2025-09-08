import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { getQuestionBytopic } from '../utils/api/topicsApi';
import {
  addQuestion,
  deleteQuestion,
  updateQuestion,
} from '../utils/api/questionApi';
export function useQuesiton(topicId: string) {
  const queryclient = useQueryClient();

  const {
    data: questions = [],
    isLoading,
    error,
  } = useQuery<questionData[],Error>({
    queryKey: ['questions', topicId],
    queryFn: async () => {
      const {questions} = await getQuestionBytopic(topicId);
      return questions;
    },
    enabled: !!topicId,
  });

  const createNewQuestion = useMutation({
    mutationFn: (questiondata: updateQuestion) =>
      addQuestion(topicId, questiondata),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ['questions', topicId] });
    },
  });

  const deleteCurrentQuestion = useMutation({
    mutationFn: (questionId: string) => deleteQuestion(questionId),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ['questions', topicId] });
    },
  });

  const updateCurrentQuestion = useMutation({
    mutationFn: (question: questionData) =>
      updateQuestion(question.id,{
        questionName: question.questionName,
        difficulty: question.difficulty,
        link: question.link
      }),
      onSuccess : ()=>{
        queryclient.invalidateQueries({queryKey: ['questions',topicId]});
      }
  });

  return {
    questions,
    error,
    isLoading,
    createNewQuestion,
    deleteCurrentQuestion,
    updateCurrentQuestion,
  };
}
