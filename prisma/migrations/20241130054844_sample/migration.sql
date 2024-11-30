-- CreateTable
CREATE TABLE `examdata` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `exam_year` INTEGER NOT NULL,
    `grade` INTEGER NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `problem_statement` TEXT NOT NULL,
    `problem_img` TEXT NOT NULL,
    `choices` JSON NOT NULL,
    `choices_img_path` JSON NOT NULL,
    `correct` INTEGER NOT NULL,
    `explanation` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
