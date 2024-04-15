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
import { RegisterBehavior } from "@sapphire/framework";
import { PaginatedMessage } from "@sapphire/discord.js-utilities";
import {
    APIEmbedField,
    codeBlock,
    Collection,
    ComponentType,
    GuildMember,
    Role,
    SlashCommandBuilder,
    User,
} from "discord.js";
import dayjs from "dayjs";

/**
 * @description The user info command.
 * @extends ImperiaCommand
 */
export class UserInfoCommand extends ImperiaCommand {
    /**
     * @description The constructor for the server info command.
     * @param context - The command context.
     * @param options - The command options.
     */
    public constructor(context: ImperiaCommand.Context, options: ImperiaCommand.Options) {
        super(context, {
            ...options,
            name: "userinfo",
            description: "Display information about the user.",
        });
    }

    /**
     * @description Register the command.
     * @param registry - The command registry.
     */
    public override registerApplicationCommands(registry: ImperiaCommand.Registry) {
        const command: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
            .addUserOption((option) =>
                option.setName("user").setDescription("Get information about the user.").setRequired(false)
            );

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
        const fieldResponses: APIEmbedField[] = await this.getFieldResponses(interaction);
        const userInformation = await this.getUserInformation(interaction);
        const paginate: PaginatedMessage = new PaginatedMessage();

        if (userInformation.roles.length <= 3) {
            paginate.addPageEmbed((embed) => {
                embed
                    .setAuthor({
                        name: interaction.user.username,
                        iconURL: interaction.user.displayAvatarURL({ size: 4096 }),
                    })
                    .addFields([...fieldResponses]);

                return embed;
            });

            return paginate.run(interaction);
        }

        const options: string[] = ["User Information", "User Roles"];
        const embeds: APIEmbedField[][] = [
            fieldResponses,
            [{ name: "⊰・Roles・⊱", value: userInformation.roles.join(", ") }],
        ];

        for (const [index] of options.entries()) {
            paginate.addPageEmbed((embed) => {
                embed
                    .setAuthor({
                        name: interaction.user.username,
                        iconURL: interaction.user.displayAvatarURL({ size: 4096 }),
                    })
                    .addFields([...embeds[index]]);

                return embed;
            });
        }

        const selectMenuOptions: {
            label: string;
            description: string;
            value: string;
        }[] = [];

        options.forEach((option) => {
            selectMenuOptions.push({
                label: option,
                description: `Select ${option}`,
                value: option,
            });
        });

        paginate.setActions([
            {
                customId: "userinfo-command-select-menu",
                type: ComponentType.StringSelect,
                emoji: "🧪",
                options: selectMenuOptions,
                placeholder: "Select an option",
                run: ({ handler, interaction }) => {
                    if (interaction.isStringSelectMenu()) {
                        handler.index = options.indexOf(interaction.values[0]);
                    }
                },
            },
        ]);

        return paginate.run(interaction);
    }

    /**
     * @description Get user information.
     * @param ctx - The command context.
     */
    private async getUserInformation(ctx: ImperiaCommand.ChatInputCommandInteraction) {
        const user: User = ctx.options.getUser("user") || ctx.user;
        const userInGuild: GuildMember = await ctx.guild.members.fetch(user.id);

        const roles: Collection<string, Role> = userInGuild.roles.cache;
        const everyoneRole: Role = roles.filter((role) => role.name === "@everyone").first();
        const filteredRoles: Collection<string, Role> = roles.filter((role) => role !== everyoneRole);
        const sortedRoles: Collection<string, Role> = filteredRoles.sort((a, b) => b.position - a.position);

        return {
            bio: {
                id: user.id,
                name: user.tag,
                nickname: userInGuild.nickname == null ? "-" : userInGuild.nickname,
                accountType: user.bot ? "Discord Bot" : "Discord User",
                createdAt: dayjs(user.createdAt),
                joinedAt: dayjs(userInGuild.joinedAt),
            },
            roles: sortedRoles.map((role) => `<@&${role.id}>`),
        };
    }

    /**
     * @description Get embed field responses.
     * @param ctx - The command context.
     */
    private async getFieldResponses(ctx: ImperiaCommand.ChatInputCommandInteraction) {
        const { bio, roles } = await this.getUserInformation(ctx);

        const info: string[] = [
            `⊱ Name            :  ${bio.name}`,
            `⊱ Nickname        :  ${bio.nickname}`,
            `⊱ User Id         :  ${bio.id}` + "ㅤ",
            `⊱ Account Created :  ${bio.createdAt.format("MMM, DD YYYY")}`,
            `⊱ Member Since    :  ${bio.joinedAt.format("MMM, DD YYYY")}`,
            `⊱ User/Bot        :  ${bio.accountType}`,
        ];

        const adjustedRoles = roles.length > 3 ? roles.slice(0, 3).join(", ") + "..." : roles.join(", ");

        return [
            { name: "⊰・Information・⊱", value: codeBlock(info.join("\n")) },
            { name: "⊰・Roles・⊱", value: adjustedRoles },
        ] as APIEmbedField[];
    }
}
