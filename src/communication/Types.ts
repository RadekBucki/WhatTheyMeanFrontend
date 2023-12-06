export interface Analyse {
  uuid: string;
  name: string;
  start_date: string;
  finish_date: string;
  status: string;
  file_type: string;
  link: string;
  raw_file: string;
  full_transcription: string;
  video_summary: string;
  author_attitude: string
}

export interface AnalyseResponse {
  analysis_uuid: string
}
