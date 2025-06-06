/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * FastAPI React Backend
 * OpenAPI spec version: 1.0.0
 */
import {
  useMutation,
  useQuery
} from '@tanstack/react-query';
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  MutationFunction,
  QueryClient,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query';

import * as axios from 'axios';
import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios';

import type {
  BlogPost,
  BlogPostCreate,
  BlogPostUpdate,
  HTTPValidationError,
  HealthCheckResponse
} from '../model';





/**
 * @summary Health Check
 */
export const healthCheckApiHealthGet = (
     options?: AxiosRequestConfig
 ): Promise<AxiosResponse<HealthCheckResponse>> => {
    
    
    return axios.default.get(
      `/api/health`,options
    );
  }


export const getHealthCheckApiHealthGetQueryKey = () => {
    return [`/api/health`] as const;
    }

    
export const getHealthCheckApiHealthGetQueryOptions = <TData = Awaited<ReturnType<typeof healthCheckApiHealthGet>>, TError = AxiosError<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof healthCheckApiHealthGet>>, TError, TData>>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getHealthCheckApiHealthGetQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof healthCheckApiHealthGet>>> = ({ signal }) => healthCheckApiHealthGet({ signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof healthCheckApiHealthGet>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type HealthCheckApiHealthGetQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheckApiHealthGet>>>
export type HealthCheckApiHealthGetQueryError = AxiosError<unknown>


export function useHealthCheckApiHealthGet<TData = Awaited<ReturnType<typeof healthCheckApiHealthGet>>, TError = AxiosError<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof healthCheckApiHealthGet>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof healthCheckApiHealthGet>>,
          TError,
          Awaited<ReturnType<typeof healthCheckApiHealthGet>>
        > , 'initialData'
      >, axios?: AxiosRequestConfig}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useHealthCheckApiHealthGet<TData = Awaited<ReturnType<typeof healthCheckApiHealthGet>>, TError = AxiosError<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof healthCheckApiHealthGet>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof healthCheckApiHealthGet>>,
          TError,
          Awaited<ReturnType<typeof healthCheckApiHealthGet>>
        > , 'initialData'
      >, axios?: AxiosRequestConfig}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useHealthCheckApiHealthGet<TData = Awaited<ReturnType<typeof healthCheckApiHealthGet>>, TError = AxiosError<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof healthCheckApiHealthGet>>, TError, TData>>, axios?: AxiosRequestConfig}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Health Check
 */

export function useHealthCheckApiHealthGet<TData = Awaited<ReturnType<typeof healthCheckApiHealthGet>>, TError = AxiosError<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof healthCheckApiHealthGet>>, TError, TData>>, axios?: AxiosRequestConfig}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getHealthCheckApiHealthGetQueryOptions(options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * すべてのブログ記事を取得する
 * @summary Get All Blog Posts
 */
export const getAllBlogPostsApiBlogGet = (
     options?: AxiosRequestConfig
 ): Promise<AxiosResponse<BlogPost[]>> => {
    
    
    return axios.default.get(
      `/api/blog/`,options
    );
  }


export const getGetAllBlogPostsApiBlogGetQueryKey = () => {
    return [`/api/blog/`] as const;
    }

    
export const getGetAllBlogPostsApiBlogGetQueryOptions = <TData = Awaited<ReturnType<typeof getAllBlogPostsApiBlogGet>>, TError = AxiosError<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getAllBlogPostsApiBlogGet>>, TError, TData>>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetAllBlogPostsApiBlogGetQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getAllBlogPostsApiBlogGet>>> = ({ signal }) => getAllBlogPostsApiBlogGet({ signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getAllBlogPostsApiBlogGet>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetAllBlogPostsApiBlogGetQueryResult = NonNullable<Awaited<ReturnType<typeof getAllBlogPostsApiBlogGet>>>
export type GetAllBlogPostsApiBlogGetQueryError = AxiosError<unknown>


export function useGetAllBlogPostsApiBlogGet<TData = Awaited<ReturnType<typeof getAllBlogPostsApiBlogGet>>, TError = AxiosError<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getAllBlogPostsApiBlogGet>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getAllBlogPostsApiBlogGet>>,
          TError,
          Awaited<ReturnType<typeof getAllBlogPostsApiBlogGet>>
        > , 'initialData'
      >, axios?: AxiosRequestConfig}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetAllBlogPostsApiBlogGet<TData = Awaited<ReturnType<typeof getAllBlogPostsApiBlogGet>>, TError = AxiosError<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getAllBlogPostsApiBlogGet>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getAllBlogPostsApiBlogGet>>,
          TError,
          Awaited<ReturnType<typeof getAllBlogPostsApiBlogGet>>
        > , 'initialData'
      >, axios?: AxiosRequestConfig}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetAllBlogPostsApiBlogGet<TData = Awaited<ReturnType<typeof getAllBlogPostsApiBlogGet>>, TError = AxiosError<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getAllBlogPostsApiBlogGet>>, TError, TData>>, axios?: AxiosRequestConfig}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Get All Blog Posts
 */

export function useGetAllBlogPostsApiBlogGet<TData = Awaited<ReturnType<typeof getAllBlogPostsApiBlogGet>>, TError = AxiosError<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getAllBlogPostsApiBlogGet>>, TError, TData>>, axios?: AxiosRequestConfig}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetAllBlogPostsApiBlogGetQueryOptions(options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * 新しいブログ記事を作成する
 * @summary Create Blog Post
 */
export const createBlogPostApiBlogPost = (
    blogPostCreate: BlogPostCreate, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<BlogPost>> => {
    
    
    return axios.default.post(
      `/api/blog/`,
      blogPostCreate,options
    );
  }



export const getCreateBlogPostApiBlogPostMutationOptions = <TError = AxiosError<HTTPValidationError>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createBlogPostApiBlogPost>>, TError,{data: BlogPostCreate}, TContext>, axios?: AxiosRequestConfig}
): UseMutationOptions<Awaited<ReturnType<typeof createBlogPostApiBlogPost>>, TError,{data: BlogPostCreate}, TContext> => {

const mutationKey = ['createBlogPostApiBlogPost'];
const {mutation: mutationOptions, axios: axiosOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, axios: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof createBlogPostApiBlogPost>>, {data: BlogPostCreate}> = (props) => {
          const {data} = props ?? {};

          return  createBlogPostApiBlogPost(data,axiosOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type CreateBlogPostApiBlogPostMutationResult = NonNullable<Awaited<ReturnType<typeof createBlogPostApiBlogPost>>>
    export type CreateBlogPostApiBlogPostMutationBody = BlogPostCreate
    export type CreateBlogPostApiBlogPostMutationError = AxiosError<HTTPValidationError>

    /**
 * @summary Create Blog Post
 */
export const useCreateBlogPostApiBlogPost = <TError = AxiosError<HTTPValidationError>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createBlogPostApiBlogPost>>, TError,{data: BlogPostCreate}, TContext>, axios?: AxiosRequestConfig}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof createBlogPostApiBlogPost>>,
        TError,
        {data: BlogPostCreate},
        TContext
      > => {

      const mutationOptions = getCreateBlogPostApiBlogPostMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    
/**
 * 指定されたIDのブログ記事を取得する
 * @summary Get Blog Post
 */
export const getBlogPostApiBlogPostIdGet = (
    postId: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<BlogPost>> => {
    
    
    return axios.default.get(
      `/api/blog/${postId}`,options
    );
  }


export const getGetBlogPostApiBlogPostIdGetQueryKey = (postId: string,) => {
    return [`/api/blog/${postId}`] as const;
    }

    
export const getGetBlogPostApiBlogPostIdGetQueryOptions = <TData = Awaited<ReturnType<typeof getBlogPostApiBlogPostIdGet>>, TError = AxiosError<HTTPValidationError>>(postId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getBlogPostApiBlogPostIdGet>>, TError, TData>>, axios?: AxiosRequestConfig}
) => {

const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetBlogPostApiBlogPostIdGetQueryKey(postId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getBlogPostApiBlogPostIdGet>>> = ({ signal }) => getBlogPostApiBlogPostIdGet(postId, { signal, ...axiosOptions });

      

      

   return  { queryKey, queryFn, enabled: !!(postId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getBlogPostApiBlogPostIdGet>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetBlogPostApiBlogPostIdGetQueryResult = NonNullable<Awaited<ReturnType<typeof getBlogPostApiBlogPostIdGet>>>
export type GetBlogPostApiBlogPostIdGetQueryError = AxiosError<HTTPValidationError>


export function useGetBlogPostApiBlogPostIdGet<TData = Awaited<ReturnType<typeof getBlogPostApiBlogPostIdGet>>, TError = AxiosError<HTTPValidationError>>(
 postId: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getBlogPostApiBlogPostIdGet>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getBlogPostApiBlogPostIdGet>>,
          TError,
          Awaited<ReturnType<typeof getBlogPostApiBlogPostIdGet>>
        > , 'initialData'
      >, axios?: AxiosRequestConfig}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetBlogPostApiBlogPostIdGet<TData = Awaited<ReturnType<typeof getBlogPostApiBlogPostIdGet>>, TError = AxiosError<HTTPValidationError>>(
 postId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getBlogPostApiBlogPostIdGet>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getBlogPostApiBlogPostIdGet>>,
          TError,
          Awaited<ReturnType<typeof getBlogPostApiBlogPostIdGet>>
        > , 'initialData'
      >, axios?: AxiosRequestConfig}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetBlogPostApiBlogPostIdGet<TData = Awaited<ReturnType<typeof getBlogPostApiBlogPostIdGet>>, TError = AxiosError<HTTPValidationError>>(
 postId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getBlogPostApiBlogPostIdGet>>, TError, TData>>, axios?: AxiosRequestConfig}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Get Blog Post
 */

export function useGetBlogPostApiBlogPostIdGet<TData = Awaited<ReturnType<typeof getBlogPostApiBlogPostIdGet>>, TError = AxiosError<HTTPValidationError>>(
 postId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getBlogPostApiBlogPostIdGet>>, TError, TData>>, axios?: AxiosRequestConfig}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetBlogPostApiBlogPostIdGetQueryOptions(postId,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * 既存のブログ記事を更新する
 * @summary Update Blog Post
 */
export const updateBlogPostApiBlogPostIdPut = (
    postId: string,
    blogPostUpdate: BlogPostUpdate, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<BlogPost>> => {
    
    
    return axios.default.put(
      `/api/blog/${postId}`,
      blogPostUpdate,options
    );
  }



export const getUpdateBlogPostApiBlogPostIdPutMutationOptions = <TError = AxiosError<HTTPValidationError>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateBlogPostApiBlogPostIdPut>>, TError,{postId: string;data: BlogPostUpdate}, TContext>, axios?: AxiosRequestConfig}
): UseMutationOptions<Awaited<ReturnType<typeof updateBlogPostApiBlogPostIdPut>>, TError,{postId: string;data: BlogPostUpdate}, TContext> => {

const mutationKey = ['updateBlogPostApiBlogPostIdPut'];
const {mutation: mutationOptions, axios: axiosOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, axios: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof updateBlogPostApiBlogPostIdPut>>, {postId: string;data: BlogPostUpdate}> = (props) => {
          const {postId,data} = props ?? {};

          return  updateBlogPostApiBlogPostIdPut(postId,data,axiosOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type UpdateBlogPostApiBlogPostIdPutMutationResult = NonNullable<Awaited<ReturnType<typeof updateBlogPostApiBlogPostIdPut>>>
    export type UpdateBlogPostApiBlogPostIdPutMutationBody = BlogPostUpdate
    export type UpdateBlogPostApiBlogPostIdPutMutationError = AxiosError<HTTPValidationError>

    /**
 * @summary Update Blog Post
 */
export const useUpdateBlogPostApiBlogPostIdPut = <TError = AxiosError<HTTPValidationError>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateBlogPostApiBlogPostIdPut>>, TError,{postId: string;data: BlogPostUpdate}, TContext>, axios?: AxiosRequestConfig}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof updateBlogPostApiBlogPostIdPut>>,
        TError,
        {postId: string;data: BlogPostUpdate},
        TContext
      > => {

      const mutationOptions = getUpdateBlogPostApiBlogPostIdPutMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    
/**
 * ブログ記事を削除する
 * @summary Delete Blog Post
 */
export const deleteBlogPostApiBlogPostIdDelete = (
    postId: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<HealthCheckResponse>> => {
    
    
    return axios.default.delete(
      `/api/blog/${postId}`,options
    );
  }



export const getDeleteBlogPostApiBlogPostIdDeleteMutationOptions = <TError = AxiosError<HTTPValidationError>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteBlogPostApiBlogPostIdDelete>>, TError,{postId: string}, TContext>, axios?: AxiosRequestConfig}
): UseMutationOptions<Awaited<ReturnType<typeof deleteBlogPostApiBlogPostIdDelete>>, TError,{postId: string}, TContext> => {

const mutationKey = ['deleteBlogPostApiBlogPostIdDelete'];
const {mutation: mutationOptions, axios: axiosOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, axios: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteBlogPostApiBlogPostIdDelete>>, {postId: string}> = (props) => {
          const {postId} = props ?? {};

          return  deleteBlogPostApiBlogPostIdDelete(postId,axiosOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type DeleteBlogPostApiBlogPostIdDeleteMutationResult = NonNullable<Awaited<ReturnType<typeof deleteBlogPostApiBlogPostIdDelete>>>
    
    export type DeleteBlogPostApiBlogPostIdDeleteMutationError = AxiosError<HTTPValidationError>

    /**
 * @summary Delete Blog Post
 */
export const useDeleteBlogPostApiBlogPostIdDelete = <TError = AxiosError<HTTPValidationError>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteBlogPostApiBlogPostIdDelete>>, TError,{postId: string}, TContext>, axios?: AxiosRequestConfig}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof deleteBlogPostApiBlogPostIdDelete>>,
        TError,
        {postId: string},
        TContext
      > => {

      const mutationOptions = getDeleteBlogPostApiBlogPostIdDeleteMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    
