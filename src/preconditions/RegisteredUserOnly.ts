/*
 * MIT License
 *
 * Copyright (c) 2023 aeviterna
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import { Precondition, PreconditionResult, Result } from "@sapphire/framework";
import { CommandInteraction } from "discord.js";
import { User as PrismaUser } from "@prisma/client";
import { ImperiaIdentifiers } from "#/typings/imperia";

/**
 * @description The developer only precondition.
 * @extends Precondition
 */
export class RegisteredUserOnlyPrecondition extends Precondition {
    /**
     * @description Run the precondition.
     * @param interaction - The interaction.
     */
    public override async chatInputRun(interaction: CommandInteraction) {
        return this.checkUser(interaction.user.id);
    }

    /**
     * @description Check if the user is a developer.
     * @param id - The user ID.
     */
    private async checkUser(id: string): Promise<PreconditionResult> {
        const getUser: Result<PrismaUser, unknown> = await Result.fromAsync(() =>
            this.container.prisma.user.findUniqueOrThrow({
                where: {
                    discordId: id,
                },
            })
        );

        return getUser.isOk() ? this.ok() : this.error({ identifier: ImperiaIdentifiers.RegisteredUserOnly });
    }
}
