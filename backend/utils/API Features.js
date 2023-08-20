class APIFeatures {
    constructor(query, queryString) {
        this.query = query; // Model.find()
        this.queryString = queryString; // req.body
    }

    filter() {
        const queryObject = { ...this.queryString };
        const excludeFields = ["page", "sort", "limit", "fields"];
        excludeFields.forEach((ele) => delete queryObject[ele]);

        let queryString = JSON.stringify(queryObject);
        queryString = queryString.replace(
            /\b(gte|gt|lte|lt)\b/g,
            (match) => `$${match}`
        );

        // Convert into json
        this.query.find(JSON.parse(queryString));

        return this;
    }


    sort() {
        if (this.queryString.sort) {
            // To sort multiple criteria
            const sortFix = this.queryString.sort.split(",").join(" ");
            this.query = this.query.sort(sortFix);
        } else {
            this.query = this.query.sort("-createdAt");
        }

        return this;
    }

    limitFields() {
        if (this.queryString.fields) {
            const selectFix = this.queryString.fields.split(",").join(" ");
            this.query = this.query.select(selectFix);
        } else {
            // Excluding only fields Here we exclude only '__v' field
            this.query = this.query.select("-__v");
        }

        return this;
    }

    paginations() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 1000;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);

        return this;
    }


}

module.exports = APIFeatures;