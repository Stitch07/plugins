export * from './lib/SubCommandEntry';
export * from './lib/SubCommandEntryCommand';
export * from './lib/SubCommandEntryMethod';
export * from './lib/SubCommandManager';
export * from './lib/SubCommandPluginCommand';

declare module '@sapphire/framework' {
	const enum Identifiers {
		SubCommandNoMatch = 'subCommandNoMatch'
	}
}
