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

import { ChatInputCommandDeniedPayload, Listener, UserError } from "@sapphire/framework";
import { ImperiaEvents, ImperiaIdentifiers } from "#/typings/imperia";
import { EmbedBuilder, InteractionResponse } from "discord.js";

/**
 * @description The chat input command denied listener.
 * @extends Listener
 */
export class ChatInputCommandDeniedListener extends Listener {
    /**
     * @description The constructor for the chat input command denied listener.
     * @param context - The listener context.
     */
    public constructor(context: Listener.Context) {
        super(context, {
            name: "chatInputCommandDenied",
            once: true,
            event: ImperiaEvents.ChatInputCommandDenied,
        });
    }

    /**
     * @description The run method for the chat input command denied listener.
     */
    public async run(error: UserError, data: ChatInputCommandDeniedPayload): Promise<InteractionResponse> {
        this.container.logger.debug(`ChatInputCommandDeniedListener: ${error.identifier} - ${error.message}`);

        const embed: EmbedBuilder = new EmbedBuilder();
        switch (error.identifier) {
            case ImperiaIdentifiers.RegisteredUserOnly:
                embed.setTitle("Registered User Only");
                embed.setDescription(
                    "This command is only available to registered users, please register using the `/register` command."
                );
                return data.interaction.reply({ embeds: [embed] });
            default:
                embed.setTitle(error.identifier);
                embed.setDescription(error.message);
                return data.interaction.reply({ embeds: [embed] });
        }
    }
}
