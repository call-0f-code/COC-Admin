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
import { handleApiError } from '../utils/handleApiError';

export function useQuesiton(topicId: string) {
  const queryclient = useQueryClient();

  const {
    data: questions = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['questions', topicId],
    queryFn: async () => {
      const {questions} = await getQuestionBytopic(topicId);
      return questions;
    },
    enabled: !!topicId,
  });

  const createNewQuestion = useMutation({
    mutationFn: (questiondata: QuestionForm) =>
      addQuestion(topicId, questiondata),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ['questions', topicId] });
    },
     onError: (err) => handleApiError(err),
  });

  const deleteCurrentQuestion = useMutation({
    mutationFn: (questionId: string) => deleteQuestion(questionId),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ['questions', topicId] });
    },
     onError: (err) => handleApiError(err),
  });

  const updateCurrentQuestion = useMutation({
    mutationFn: (question: Question) =>
      updateQuestion(question.id,{
        questionName: question.questionName,
        difficulty: question.difficulty,
        link: question.link
      }),
      onSuccess : ()=>{
        queryclient.invalidateQueries({queryKey: ['questions',topicId]});
      },
       onError: (err) => handleApiError(err),
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
