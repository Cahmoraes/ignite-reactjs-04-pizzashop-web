import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'

// Definição dos tipos para a função assíncrona e os parâmetros do hook
type AsyncFunction<P, R> = P extends undefined
  ? () => Promise<R>
  : (params: P) => Promise<R>

type CreateQueryParams<P, R> = P extends undefined
  ? { options?: UseQueryOptions<R, unknown> }
  : { params: P; options?: UseQueryOptions<R, unknown> }

// Função factory que cria o hook customizado
export function createQuery<P, R>(
  queryKey: string,
  asyncFn: AsyncFunction<P, R>,
) {
  // Função auxiliar para obter a chave da query
  const getQueryKey = (params?: CreateQueryParams<P, R>) =>
    params && 'params' in params ? [queryKey, params.params] : [queryKey]

  // Função auxiliar para executar a query
  const executeQuery = async (params?: CreateQueryParams<P, R>) => {
    if (params && 'params' in params) {
      return (asyncFn as (params: P) => Promise<R>)(params.params)
    }
    return (asyncFn as () => Promise<R>)()
  }

  // Hook customizado que usa useQuery internamente
  return function useCustomQuery(
    params?: CreateQueryParams<P, R>,
  ): UseQueryResult<R> {
    return useQuery({
      queryKey: getQueryKey(params),
      queryFn: () => executeQuery(params),
      ...params?.options,
    }) as UseQueryResult<R>
  }
}

// Exemplo de uso com função assíncrona que recebe parâmetros
const fetchDataWithParams = async ({
  id,
}: {
  id: number
}): Promise<{ name: string }> => {
  const response = await fetch(`https://api.example.com/data/${id}`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

// Exemplo de uso com função assíncrona que não recebe parâmetros
const fetchDataWithoutParams = async (): Promise<{ name: string }> => {
  const response = await fetch(`https://api.example.com/data`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

// Criando hooks customizados
const useFetchDataWithParams = createQuery<{ id: number }, { name: string }>(
  'fetchDataWithParams',
  fetchDataWithParams,
)
const useFetchDataWithoutParams = createQuery<undefined, { name: string }>(
  'fetchDataWithoutParams',
  fetchDataWithoutParams,
)

// Usando o hook customizado no componente
export const MyComponentWithParams = () => {
  const { data, error, isLoading } = useFetchDataWithParams({
    params: { id: 1 },
    options: { staleTime: 1000, queryKey: ['fetchDataWithParams', { id: 1 }] },
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return <div>{data ? data.name : 'No data'}</div>
}

export const MyComponentWithoutParams = () => {
  const { data, error, isLoading } = useFetchDataWithoutParams({
    options: { staleTime: 1000, queryKey: ['fetchDataWithoutParams'] },
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return <div>{data ? data.name : 'No data'}</div>
}
