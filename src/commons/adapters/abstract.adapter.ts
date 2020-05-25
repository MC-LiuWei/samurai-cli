/*
 * @Author: your name
 * @Date: 2020-04-06 17:28:15
 * @LastEditTime: 2020-04-07 09:53:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /samurai-cli/src/commons/adapters/abstract.adapter.ts
 */
import * as chalk from 'chalk';
import { ChildProcess, spawn, SpawnOptions } from 'child_process';

export default abstract class AbstractAdapter {
    constructor(protected cmd: string) {}

    public start(scripts: string, collect = false, cwd: string = process.cwd()):Promise<null | string> {
        const args: string[] = [scripts];
        const options: SpawnOptions = {
            cwd,
            stdio: collect ? 'pipe' : 'inherit',
            shell: true,
        };

        return new Promise<null | string>((res, rej) => {
            const task: ChildProcess = spawn(`${this.cmd}`, args, options);
            if (collect) {
                task.stdout!.on('data', data => { res(data.toString().replace(/\r\n|\n/,'')) });
            }
            task.on('close', code => {
                if (code === 0) {
                    res(null);
                } else {
                    rej();
                }
            });
        });
    }
}