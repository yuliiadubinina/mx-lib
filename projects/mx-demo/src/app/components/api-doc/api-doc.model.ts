export type BlockType = 'services' | 'directives' | 'classes' | 'interfaces' | 'functions' | 'type_aliases' | 'constants';

export class ApiDocTable {
    name: string;
    description: string;
    remark?: string | null;

    constructor(name: string, description: string, remark?: string) {
        this.name = name;
        this.description = description;
        this.remark = remark || null;
    }
}

export class ApiDocBlockDetails {
    name?: string;
    description?: string;
    selector?: string;
    exportAs?: string;
    properties: ApiDocTable[];
    methods: ApiDocTable[];
    styles: string[] = [];
    codeBlock?: string;

    constructor() {
        this.properties = [];
        this.methods = [];
    }
}

export class ApiDocBlock {
    blockType?: BlockType;
    details: ApiDocBlockDetails[];

    constructor() {
        this.details = [];
    }
}

export class ApiDocModel {
    usageCode?: string | null;
    usageCodeJS?: string | null;
    referenceCode?: string | null;
    description?: string | null;

    blocks: ApiDocBlock[];


    constructor() {
        this.blocks = [];
    }
}
