import zxcvbn from "zxcvbn";

export const passwordStrengthProgressBar = (password: string): number => {
    if (!password) return 0;

    const strength = zxcvbn(password);

    switch(strength.score) {
        case 0:
            return 0;
        case 1:
        case 2:
            return 20;
        case 3:
            return 50;
        case 4:
            return 100;
    }
};