export class AccountIdentityHelper {

    static getDisplayIdentity(firstName: string | undefined, lastName: string | undefined): string | undefined {
        if (!firstName && !lastName) {
            return undefined;
        }

        firstName = capitalizeFirstLetter(firstName);
        lastName = capitalizeFirstLetter(lastName);
        return `${firstName} ${lastName}`.trim();
    }
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}