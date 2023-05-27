const { opendir, readFile } = require('node:fs/promises');

type ResponseFormat<T> = {
  success: boolean;
  message?: string;
  payload?: T;
};

export type GlobalVarForm = {
  filePaths: string[];
}

export async function readMusicFile(filePath: string): Promise<Buffer> {
  try {
    const fileContent: Buffer = await readFile(filePath);
    return fileContent;
  } catch (err: any) {
    console.error(err);
    return Buffer.from([]);
  }
}

export async function openPath(path: string): Promise<ResponseFormat<any[]>> {
  try {
    const filenames: string[] = [];
    const dir = await opendir(path);
    for await (const file of dir) {
      if (file.name.substring(0, 2) !== '._') {
        filenames.push(file.name);
      }
    }
    return {
      success: true,
      payload: filenames,
    }
  } catch (err) {
    return {
      success: false,
      message: String(err),
    }
  } 
}

export function addPath(global_var: GlobalVarForm, newpath: string): ResponseFormat<number> {
  const { filePaths } = global_var;
  if (filePaths.find(path => path === newpath)) {
    return {
      success: false,
      message: 'Path already exists',
      payload: filePaths.length,
    }
  } else {
    return {
      success: true,
      payload: filePaths.push(newpath),
    }
  }
}

export function deletePaths(global_var: GlobalVarForm, paths: string[]): ResponseFormat<number> {
  try {
    global_var.filePaths = global_var.filePaths.filter( e => {
      for (const path of paths) {
        if (e === path) {
          return false;
        }
      }
      return true;
    });
    return {
      success: true,
      payload: global_var.filePaths.length,
    }
  } catch(err) {
    return {
      success: false,
      payload: global_var.filePaths.length,
    }
  }
}

export function clearPaths(global_var: GlobalVarForm): ResponseFormat<undefined> {
  try {
    global_var.filePaths = [];
    return {
      success: true,
    }
  } catch(err) {
    return {
      success: false,
      message: String(err),
    }
  }
}

export function readPaths(global_var: GlobalVarForm): ResponseFormat<string[]> {
  return {
    success: true,
    payload: global_var.filePaths.slice()
  }
}