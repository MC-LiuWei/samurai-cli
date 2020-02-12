export interface IExamplesConfig {
  name: string;
  alias: string;
}

export interface IExamples {
  config: IExamplesConfig,
  generate: () => any
}