export interface IExamplesConfig {
  name: string;
  alias: string;
}

export interface IExamples {
  config: IExamplesConfig,
  generate: (path: string, name: string, options?: any) => any
}