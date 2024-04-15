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

import { ImperiaCommand } from "#/extensions/ImperiaCommand";
import { Command, CommandStore, RegisterBehavior } from "@sapphire/framework";
import { chatInputApplicationCommandMention, Collection, ComponentType, SlashCommandBuilder } from "discord.js";
import { PaginatedMessage } from "@sapphire/discord.js-utilities";

/**
 * @description The help command.
 * @extends ImperiaCommand
 */
export class HelpCommand extends ImperiaCommand {
    /**
     * @description The constructor for the help command.
     * @param context - The command context.
     * @param options - The command options.
     */
    public constructor(context: ImperiaCommand.Context, options: ImperiaCommand.Options) {
        super(context, {
            ...options,
            name: "help",
            description: "Retrive a helpful information about the bot and its available commands.",
        });
    }

    /**
     * @description Register the command.
     * @param registry - The command registry.
     */
    public override registerApplicationCommands(registry: ImperiaCommand.Registry) {
        const command: SlashCommandBuilder = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description);

        registry.registerChatInputCommand(command, {
            behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
            guildIds: [],
            idHints: [],
        });
    }

    /**
     * @description Run the command.
     * @param interaction - The command interaction.
     */
    public async chatInputRun(interaction: ImperiaCommand.ChatInputCommandInteraction): Promise<PaginatedMessage> {
        await interaction.deferReply();

        const commands: CommandStore = this.container.stores.get("commands");
        const categories: string[] = [...new Set(commands.map((cmd: ImperiaCommand) => cmd.category))];
        categories.unshift("primary");

        const paginate: PaginatedMessage = new PaginatedMessage();

        paginate.addPageEmbed((embed) => {
            embed.setTitle(`Help`);
            embed.setDescription("To be added with information about the bot and its available commands.");
            return embed;
        });

        for (const category of categories) {
            if (category === "primary") continue;

            if (category === "developer" && !this.container.utilities.service.checkDeveloper(interaction.user.id)) {
                continue;
            }

            const categoryCommands: Collection<string, Command> = commands.filter(
                (cmd: Command): boolean => cmd.category === category
            );
            const fields: ImperiaCommand[] = categoryCommands.map((cmd: ImperiaCommand) => cmd);

            const commandFields: {
                name: `</${string}:${string}>`;
                value: string;
                inline: boolean;
            }[] = fields.map((cmd: ImperiaCommand) => {
                const commandId: string = this.container.applicationCommandRegistries.acquire(cmd.name).globalCommandId;
                let command;

                if (!commandId) command = `/${cmd.name}`;
                else command = chatInputApplicationCommandMention(cmd.name, commandId);

                return { name: command, value: `${cmd.description}`, inline: true };
            });

            paginate.addPageEmbed((embed) => {
                embed.setTitle(`${category.charAt(0).toUpperCase() + category.slice(1)} Commands`);
                embed.addFields(commandFields);
                return embed;
            });
        }

        const selectMenuOptions: {
            label: string;
            description: string;
            value: string;
        }[] = [];

        selectMenuOptions.push(
            ...categories.map((category) => ({
                label: category.charAt(0).toUpperCase() + category.slice(1),
                description:
                    category === "primary"
                        ? "View the primary page."
                        : `View ${category.charAt(0).toUpperCase() + category.slice(1)}-related commands.`,
                value: category,
            }))
        );

        paginate.setActions([
            {
                customId: "help-command-experimental",
                type: ComponentType.StringSelect,
                emoji: "🧪",
                options: selectMenuOptions,
                placeholder: "Select a category...",
                run: ({ handler, interaction }) => {
                    if (interaction.isStringSelectMenu()) {
                        handler.index = categories.indexOf(interaction.values[0]);
                    }
                },
            },
        ]);

        return paginate.run(interaction);
    }
}
